import qs from 'qs';

export default function transformListRequest(
  searchParams: {
    [key: string]: string;
  },
  // tslint:disable-next-line:no-any
  pageInfo: any,
) {
  return qs.stringify(
    {
      ...searchParams,
      size: pageInfo.pageSize,
      page: pageInfo.pageNo,
      sort:
        pageInfo.sorts &&
        pageInfo.sorts.map(
          (sortInfo) =>
            `${sortInfo.property}${
              sortInfo.direction === 'desc' ? '_desc' : ''
            }`,
        ),
    },
    {
      arrayFormat: 'comma',
    },
  );
}
