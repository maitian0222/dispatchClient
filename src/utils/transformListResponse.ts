interface HackerNew {
  objectID: string;
  title: string;
  url: string;
  auth: string;
  tags: string[];
}

interface PageResponse<T> {
  /**
   * 数据列表
   */
  content: T[];
  /**
   * 总大小
   */
  totalElements: number;
  /**
   * 一页显示多少条结果
   */
  size: number;
  /**
   * 当前是第几页
   */
  number: number;

  /**
   * 总页数，可以没有。如果没有，则等于`Math.ceil(totalElements/size)`。
   */
  totalPages?: number;
}

interface HackerNewsListResponse {
  hits: HackerNew[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
}

export default function transformListResponse(
  response: HackerNewsListResponse,
): PageResponse<HackerNew> {
  return {
    content: response.content.children,
    totalElements: response.totalElements,
    number: response.data.number,
    totalPages: response.data.totalPages,
    size: response.data.size,
  };
}
