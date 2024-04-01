import React from "react";

const TableRow = ({title, content}) => <div
    className={`
     px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 
     odd:bg-gray-100 dark:odd:bg-gray-800
     even:bg-white dark:even:bg-gray-900
     `}
>
    <dt className="text-sm font-medium">{title}</dt>
    <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{content}</dd>
</div>

export default TableRow