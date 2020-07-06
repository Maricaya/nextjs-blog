import Link from 'next/link';
import * as React from 'react';
import _ from 'lodash';

type usePagerOptions = {
    page: number,
    totalPage: number,
    urlMaker?: (n: number) => string
}
const defaultUrlMaker = (n:number) => `?page=${n}`;

export const usePager = (options: usePagerOptions) => {
    const {page, totalPage, urlMaker: _urlMaker} = options;
    const urlMaker = _urlMaker || defaultUrlMaker;
    const numbers = [];
    numbers.push(1);
    for (let i = page - 3; i <= page + 3; i++) {
        numbers.push(i);
    }
    numbers.push(totalPage);
    const pageNumbers = _.uniq(numbers).sort().filter(n => n >= 1 && n <= totalPage).reduce((result, n) => n - (result[result.length - 1] || 0) === 1 ?
        result.concat(n) : result.concat(-1, n), []);

    const pager = (
        <div className="wrapper">
            {page !== 1 && <Link href={urlMaker(page - 1)}>
              <a>上一页</a>
            </Link>}
            {pageNumbers.map(n => n === -1 ?
                <span>...</span> : <Link href={urlMaker(n)}>
                <a>{n}</a>
            </Link>)}

            {page < totalPage && <Link href={urlMaker(page + 1)}>
              <a>下一页</a>
            </Link>}
            第 {page}/{totalPage} 页

            <style jsx>{`
            .wrapper {
                margin: 0 -8px;
            }
            .wrapper > a, .wrapper > span {
                margin: 0 8px;
             }
            `}</style>
        </div>
    );
    return {pager};
};
