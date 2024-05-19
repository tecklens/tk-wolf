import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  IAddMemberData,
  MemberEntity,
  MemberRepository,
} from '@libs/repositories/member';
import { MemberRoleEnum } from '@libs/shared/entities/user/member.enum';
import { IJwtPayload } from '@libs/shared/types';
import { MemberStatusEnum } from '@libs/shared/entities/user/member.interface';
import { ApiException } from '@pak/utils/exceptions';
import { OrganizationRepository } from '@libs/repositories/organization';
import { InviteMemberDto } from '@app/organization/dtos/invite-member.dto';
import { UserEntity, UserRepository } from '@libs/repositories/user';

import { v1 as uuidv1 } from 'uuid';
import { ResendInviteDto } from '@app/organization/dtos/resend-invite.dto';
import { normalizeEmail } from '@pak/utils/email-normalization';
import { capitalize } from 'lodash';
import { AuthService } from '@app/auth/auth.service';
import { MailFactory } from '@app/provider/factories';
import { ProviderEntity } from '@libs/repositories/provider';
import {
  decryptApiKey,
  decryptCredentials,
} from '@libs/shared/encryptions/encrypt-provider';
import { ChannelTypeEnum } from '@libs/provider/provider.interface';

const designHtmlInvite =
  '<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">\n' +
  '<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">\n' +
  '<head>\n' +
  '<!--[if gte mso 9]>\n' +
  '<xml>\n' +
  '  <o:OfficeDocumentSettings>\n' +
  '    <o:AllowPNG/>\n' +
  '    <o:PixelsPerInch>96</o:PixelsPerInch>\n' +
  '  </o:OfficeDocumentSettings>\n' +
  '</xml>\n' +
  '<![endif]-->\n' +
  '  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\n' +
  '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
  '  <meta name="x-apple-disable-message-reformatting">\n' +
  '  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->\n' +
  '  <title></title>\n' +
  '  \n' +
  '    <style type="text/css">\n' +
  '      @media only screen and (min-width: 620px) {\n' +
  '  .u-row {\n' +
  '    width: 600px !important;\n' +
  '  }\n' +
  '  .u-row .u-col {\n' +
  '    vertical-align: top;\n' +
  '  }\n' +
  '\n' +
  '  .u-row .u-col-100 {\n' +
  '    width: 600px !important;\n' +
  '  }\n' +
  '\n' +
  '}\n' +
  '\n' +
  '@media (max-width: 620px) {\n' +
  '  .u-row-container {\n' +
  '    max-width: 100% !important;\n' +
  '    padding-left: 0px !important;\n' +
  '    padding-right: 0px !important;\n' +
  '  }\n' +
  '  .u-row .u-col {\n' +
  '    min-width: 320px !important;\n' +
  '    max-width: 100% !important;\n' +
  '    display: block !important;\n' +
  '  }\n' +
  '  .u-row {\n' +
  '    width: 100% !important;\n' +
  '  }\n' +
  '  .u-col {\n' +
  '    width: 100% !important;\n' +
  '  }\n' +
  '  .u-col > div {\n' +
  '    margin: 0 auto;\n' +
  '  }\n' +
  '}\n' +
  'body {\n' +
  '  margin: 0;\n' +
  '  padding: 0;\n' +
  '}\n' +
  '\n' +
  'table,\n' +
  'tr,\n' +
  'td {\n' +
  '  vertical-align: top;\n' +
  '  border-collapse: collapse;\n' +
  '}\n' +
  '\n' +
  'p {\n' +
  '  margin: 0;\n' +
  '}\n' +
  '\n' +
  '.ie-container table,\n' +
  '.mso-container table {\n' +
  '  table-layout: fixed;\n' +
  '}\n' +
  '\n' +
  '* {\n' +
  '  line-height: inherit;\n' +
  '}\n' +
  '\n' +
  "a[x-apple-data-detectors='true'] {\n" +
  '  color: inherit !important;\n' +
  '  text-decoration: none !important;\n' +
  '}\n' +
  '\n' +
  'table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; }\n' +
  '    </style>\n' +
  '  \n' +
  '  \n' +
  '\n' +
  '<!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Cabin:400,700&display=swap" rel="stylesheet" type="text/css"><!--<![endif]-->\n' +
  '\n' +
  '</head>\n' +
  '\n' +
  '<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">\n' +
  '  <!--[if IE]><div class="ie-container"><![endif]-->\n' +
  '  <!--[if mso]><div class="mso-container"><![endif]-->\n' +
  '  <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%" cellpadding="0" cellspacing="0">\n' +
  '  <tbody>\n' +
  '  <tr style="vertical-align: top">\n' +
  '    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">\n' +
  '    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #f9f9f9;"><![endif]-->\n' +
  '    \n' +
  '  \n' +
  '  \n' +
  '<div class="u-row-container" style="padding: 0px;background-color: transparent">\n' +
  '  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">\n' +
  '    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">\n' +
  '      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->\n' +
  '      \n' +
  '<!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #16a34a;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->\n' +
  '<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">\n' +
  '  <div style="background-color: #16a34a;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">\n' +
  '  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->\n' +
  '  \n' +
  '<table style="font-family:\'Cabin\',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">\n' +
  '  <tbody>\n' +
  '    <tr>\n' +
  '      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:\'Cabin\',sans-serif;" align="left">\n' +
  '        \n' +
  '  <div>\n' +
  '    <div style="height: 1px;"></div>\n' +
  '  </div>\n' +
  '\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '  </tbody>\n' +
  '</table>\n' +
  '\n' +
  '  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->\n' +
  '  </div>\n' +
  '</div>\n' +
  '<!--[if (mso)|(IE)]></td><![endif]-->\n' +
  '      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->\n' +
  '    </div>\n' +
  '  </div>\n' +
  '  </div>\n' +
  '  \n' +
  '\n' +
  '\n' +
  '  \n' +
  '  \n' +
  '<div class="u-row-container" style="padding: 0px;background-color: transparent">\n' +
  '  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">\n' +
  '    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">\n' +
  '      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->\n' +
  '      \n' +
  '<!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->\n' +
  '<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">\n' +
  '  <div style="height: 100%;width: 100% !important;">\n' +
  '  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->\n' +
  '  \n' +
  '<table style="font-family:\'Cabin\',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">\n' +
  '  <tbody>\n' +
  '    <tr>\n' +
  '      <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:\'Cabin\',sans-serif;" align="left">\n' +
  '        \n' +
  '  <div style="font-size: 14px; line-height: 160%; text-align: center; word-wrap: break-word;">\n' +
  '    <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 22px; line-height: 35.2px;">Hi, </span></p>\n' +
  '<p style="font-size: 14px; line-height: 160%;">Hi!<br />You have been invited to "{{team}}" by the user {{email}}<em>.</em> Click on the button below to accept.</p>\n' +
  '  </div>\n' +
  '\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '  </tbody>\n' +
  '</table>\n' +
  '\n' +
  '<table style="font-family:\'Cabin\',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">\n' +
  '  <tbody>\n' +
  '    <tr>\n' +
  '      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:\'Cabin\',sans-serif;" align="left">\n' +
  '        \n' +
  '  <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->\n' +
  '<div align="center">\n' +
  '  <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="{{base_url}}{{token}}" style="height:46px; v-text-anchor:middle; width:196px;" arcsize="8.5%"  stroke="f" fillcolor="#ff6600"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->\n' +
  '    <a href="{{base_url}}{{token}}" target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #ff6600; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">\n' +
  '      <span style="display:block;padding:14px 44px 13px;line-height:120%;"><span style="font-size: 16px; line-height: 19.2px;"><strong><span style="line-height: 19.2px; font-size: 16px;">ACCEPT INVITE</span></strong></span></span>\n' +
  '    </a>\n' +
  '    <!--[if mso]></center></v:roundrect><![endif]-->\n' +
  '</div>\n' +
  '\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '  </tbody>\n' +
  '</table>\n' +
  '\n' +
  '<table style="font-family:\'Cabin\',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">\n' +
  '  <tbody>\n' +
  '    <tr>\n' +
  '      <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px 60px;font-family:\'Cabin\',sans-serif;" align="left">\n' +
  '        \n' +
  '  <div style="font-size: 14px; line-height: 160%; text-align: center; word-wrap: break-word;">\n' +
  '    <p style="line-height: 160%; font-size: 14px;"><span style="font-size: 18px; line-height: 28.8px;">Thanks,</span></p>\n' +
  '<p style="line-height: 160%; font-size: 14px;"><span style="font-size: 18px; line-height: 28.8px;">The WOLF Team</span></p>\n' +
  '  </div>\n' +
  '\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '  </tbody>\n' +
  '</table>\n' +
  '\n' +
  '  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->\n' +
  '  </div>\n' +
  '</div>\n' +
  '<!--[if (mso)|(IE)]></td><![endif]-->\n' +
  '      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->\n' +
  '    </div>\n' +
  '  </div>\n' +
  '  </div>\n' +
  '  \n' +
  '\n' +
  '\n' +
  '  \n' +
  '  \n' +
  '<div class="u-row-container" style="padding: 0px;background-color: transparent">\n' +
  '  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #e5eaf5;">\n' +
  '    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">\n' +
  '      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #e5eaf5;"><![endif]-->\n' +
  '      \n' +
  '<!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->\n' +
  '<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">\n' +
  '  <div style="height: 100%;width: 100% !important;">\n' +
  '  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->\n' +
  '  \n' +
  '<table style="font-family:\'Cabin\',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">\n' +
  '  <tbody>\n' +
  '    <tr>\n' +
  '      <td style="overflow-wrap:break-word;word-break:break-word;padding:21px 55px 18px;font-family:\'Cabin\',sans-serif;" align="left">\n' +
  '        \n' +
  '  <div style="font-size: 14px; color: #16a34a; line-height: 160%; text-align: center; word-wrap: break-word;">\n' +
  '    <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 20px; line-height: 32px;"><strong>Get in touch</strong></span></p>\n' +
  '<p style="font-size: 14px; line-height: 160%;"><span style="font-size: 16px; line-height: 25.6px; color: #000000;">support@wolfx.app</span></p>\n' +
  '  </div>\n' +
  '\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '  </tbody>\n' +
  '</table>\n' +
  '\n' +
  '  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->\n' +
  '  </div>\n' +
  '</div>\n' +
  '<!--[if (mso)|(IE)]></td><![endif]-->\n' +
  '      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->\n' +
  '    </div>\n' +
  '  </div>\n' +
  '  </div>\n' +
  '  \n' +
  '\n' +
  '\n' +
  '  \n' +
  '  \n' +
  '<div class="u-row-container" style="padding: 0px;background-color: transparent">\n' +
  '  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #003399;">\n' +
  '    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">\n' +
  '      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #003399;"><![endif]-->\n' +
  '      \n' +
  '<!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->\n' +
  '<div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">\n' +
  '  <div style="height: 100%;width: 100% !important;">\n' +
  '  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->\n' +
  '  \n' +
  '<table style="font-family:\'Cabin\',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">\n' +
  '  <tbody>\n' +
  '    <tr>\n' +
  '      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:\'Cabin\',sans-serif;" align="left">\n' +
  '        \n' +
  '  <div style="font-size: 14px; color: #fafafa; line-height: 180%; text-align: center; word-wrap: break-word;">\n' +
  '    <p style="font-size: 14px; line-height: 180%;"><span style="font-size: 16px; line-height: 28.8px;">Copyrights © Company All Rights Reserved</span></p>\n' +
  '  </div>\n' +
  '\n' +
  '      </td>\n' +
  '    </tr>\n' +
  '  </tbody>\n' +
  '</table>\n' +
  '\n' +
  '  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->\n' +
  '  </div>\n' +
  '</div>\n' +
  '<!--[if (mso)|(IE)]></td><![endif]-->\n' +
  '      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->\n' +
  '    </div>\n' +
  '  </div>\n' +
  '  </div>\n' +
  '  \n' +
  '\n' +
  '\n' +
  '    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->\n' +
  '    </td>\n' +
  '  </tr>\n' +
  '  </tbody>\n' +
  '  </table>\n' +
  '  <!--[if mso]></div><![endif]-->\n' +
  '  <!--[if IE]></div><![endif]-->\n' +
  '</body>\n' +
  '\n' +
  '</html>\n';

@Injectable()
export class OrganizationService {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly organizationRepository: OrganizationRepository,
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async delMember(u: IJwtPayload, id: string) {
    await this.memberRepository.removeMemberById(u.organizationId, id);
  }

  async getMembers(user: IJwtPayload) {
    return (
      await this.memberRepository.getOrganizationMembers(user.organizationId)
    )
      .map((member) => {
        if (!user.roles.includes(MemberRoleEnum.ADMIN)) {
          if (member.memberStatus === MemberStatusEnum.INVITED) return null;
          if (member.user) member.user.email = '';
          if (member.invite) member.invite.email = '';
        }

        return member;
      })
      .filter((member) => !!member);
  }

  async inviteMember(u: IJwtPayload, payload: InviteMemberDto) {
    const organization = await this.organizationRepository.findById(
      u.organizationId,
    );
    if (!organization) throw new ApiException('No organization found');

    const foundInvitee = await this.memberRepository.findInviteeByEmail(
      organization._id,
      payload.email,
    );

    if (foundInvitee) throw new ApiException('Already invited');

    const inviterUser = await this.userRepository.findById(u._id);
    if (!inviterUser)
      throw new NotFoundException(`Inviter ${u._id} is not found`);

    const token = uuidv1();

    if (
      process.env.NODE_ENV === 'dev' ||
      process.env.NODE_ENV === 'production'
    ) {
      const content = designHtmlInvite
        .replace('{{token}}', token)
        .replace('{{token}}', token)
        .replace('{{base_url}}', process.env.FRONT_END_URL)
        .replace('{{team}}', 'WOLF')
        .replace('{{email}}', normalizeEmail(u.email));
      await this.sendEmail(
        [payload.email],
        content,
        "You've been invited to WOLF",
      );
    }

    const memberPayload: IAddMemberData = {
      roles: [MemberRoleEnum.ADMIN],
      memberStatus: MemberStatusEnum.INVITED,
      invite: {
        token,
        _inviterId: u._id,
        email: payload.email,
        invitationDate: new Date(),
      },
    };

    // this.analyticsService.track('Invite Organization Member', u._id, {
    //   _organization: u.organizationId,
    //   role: MemberRoleEnum.ADMIN,
    // });

    await this.memberRepository.addMember(
      organization._id,
      memberPayload,
      false,
    );
  }

  async resendInviteMember(u: IJwtPayload, payload: ResendInviteDto) {
    const organization = await this.organizationRepository.findById(
      u.organizationId,
    );
    if (!organization) throw new ApiException('No organization found');

    const foundInvitee = await this.memberRepository.findOne({
      _id: payload.memberId,
      _organizationId: u.organizationId,
    });
    if (!foundInvitee) throw new ApiException('Member not found');
    if (foundInvitee.memberStatus !== MemberStatusEnum.INVITED)
      throw new ApiException('Member already active');
    if (!foundInvitee.invite)
      throw new ApiException('Invited user is not found');

    const inviterUser = await this.userRepository.findById(u._id);
    if (!inviterUser) throw new ApiException('Inviter is not found');

    const token = uuidv1();

    if (
      process.env.NODE_ENV === 'dev' ||
      process.env.NODE_ENV === 'production'
    ) {
      const content = designHtmlInvite
        .replace('{{token}}', token)
        .replace('{{token}}', token)
        .replace('{{base_url}}', process.env.FRONT_END_URL)
        .replace('{{team}}', 'WOLF')
        .replace('{{email}}', normalizeEmail(u.email));
      await this.sendEmail(
        [foundInvitee.invite.email],
        content,
        "You've been invited to WOLF",
      );
    }

    await this.memberRepository.update(foundInvitee, {
      memberStatus: MemberStatusEnum.INVITED,
      invite: {
        token,
        _inviterId: u._id,
        invitationDate: new Date(),
      },
    });
  }

  async getInviteInfo(token: string) {
    const invitedMember = await this.memberRepository.findByInviteToken(token);
    if (!invitedMember) throw new ApiException('No invite found');

    const organization = await this.organizationRepository.findById(
      invitedMember._organizationId,
    );
    if (!organization) throw new NotFoundException('Organization not found');

    if (invitedMember.memberStatus !== MemberStatusEnum.INVITED) {
      throw new ApiException('Invite token expired');
    }

    if (!invitedMember.invite) throw new NotFoundException(`Invite not found`);

    const user = await this.userRepository.findById(
      invitedMember.invite._inviterId,
    );
    if (!user) throw new NotFoundException('User not found');

    const invitedUser = await this.userRepository.findByEmail(
      normalizeEmail(invitedMember.invite.email),
    );

    return {
      inviter: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePicture: user.profilePicture,
      },
      organization: {
        _id: organization._id,
        name: organization.name,
        logo: organization.logo,
      },
      email: invitedMember.invite.email,
      _userId: invitedUser ? invitedUser._id : undefined,
    };
  }

  async acceptInviteMember(u: IJwtPayload, token: string) {
    const member = await this.memberRepository.findByInviteToken(token);
    if (!member) throw new ApiException('No organization found');
    if (!member.invite)
      throw new ApiException('No active invite found for user');

    const organization = await this.organizationRepository.findById(
      member._organizationId,
    );
    if (!organization) throw new NotFoundException('No organization found');

    const user = await this.userRepository.findById(u._id);
    if (!user) throw new NotFoundException('No user found');

    if (member.memberStatus !== MemberStatusEnum.INVITED)
      throw new ApiException('Token expired');

    const inviter = await this.userRepository.findById(
      member.invite._inviterId,
    );
    if (!inviter) throw new NotFoundException('No inviter entity found');

    await this.memberRepository.convertInvitedUserToMember(
      u.organizationId,
      token,
      {
        memberStatus: MemberStatusEnum.ACTIVE,
        _userId: u._id,
        answerDate: new Date(),
      },
    );

    await this.sendInviterAcceptedEmail(inviter, member);

    return this.authService.generateUserToken(user);
  }

  async sendInviterAcceptedEmail(inviter: UserEntity, member: MemberEntity) {
    if (!member.invite) return;

    try {
      if (
        (process.env.NODE_ENV === 'dev' ||
          process.env.NODE_ENV === 'production') &&
        process.env.APP_RESEND_API_KEY
      ) {
        await this.sendEmail(
          [inviter.email || ''],
          '',
          'You have joined the team',
        );
      }
    } catch (e) {
      Logger.error(e.message, e.stack, 'Accept inviter send email');
    }
  }

  async sendEmail(to: string[], designHtml: string, subject: string) {
    const mailFactory = new MailFactory();
    const mailHandler = mailFactory.getHandler(
      this.buildFactoryIntegration({
        providerId: 'resend',
        channel: ChannelTypeEnum.EMAIL,
        _environmentId: '',
        _organizationId: '',
        active: false,
        credentials: {
          apiKey: decryptApiKey(process.env.APP_RESEND_API_KEY),
          senderName: process.env.APP_RESEND_SENDER_NAME,
        },
        identifier: '',
        name: '',
        primary: false,
        priority: 0,
      }),
      process.env.APP_DEFAULT_EMAIL,
    );

    const result = await mailHandler.send({
      from: process.env.APP_DEFAULT_EMAIL,
      to: [...to],
      html: designHtml,
      subject: subject,
    });
    if (!result?.id) {
      throw new BadRequestException(
        `Error when send email invite member ${to}.`,
      );
    }
  }

  public buildFactoryIntegration(
    integration: ProviderEntity,
    senderName?: string,
  ) {
    return {
      ...integration,
      credentials: {
        ...decryptCredentials(integration.credentials),
      },
      providerId: integration.providerId,
    };
  }
}
