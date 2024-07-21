import { IGetWorkflowOverrideResponseDto } from '@stateless/lib/dto';
export interface IGetWorkflowOverridesResponseDto {
    hasMore: boolean;
    data: IGetWorkflowOverrideResponseDto[];
    pageSize: number;
    page: number;
}
