import { IGetWorkflowOverrideResponseDto } from '../../dto';
export interface IGetWorkflowOverridesResponseDto {
    hasMore: boolean;
    data: IGetWorkflowOverrideResponseDto[];
    pageSize: number;
    page: number;
}
