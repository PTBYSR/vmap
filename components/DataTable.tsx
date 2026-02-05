import React from 'react';

interface Column<T> {
    key: string;
    label: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
    columns: Column<T>[];
    data: T[];
    highlightRow?: (row: T) => boolean;
    className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DataTable<T extends Record<string, any>>({
    columns,
    data,
    highlightRow,
    className = '',
}: DataTableProps<T>) {
    return (
        <div className={`w-full overflow-x-auto ${className}`}>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-gray-200">
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className="text-left py-3 px-4 text-sm font-semibold text-vmap-text bg-gray-50"
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => {
                        const isHighlighted = highlightRow ? highlightRow(row) : false;
                        return (
                            <tr
                                key={index}
                                className={`border-b border-gray-100 transition-colors ${isHighlighted
                                    ? 'bg-orange-50 border-l-4 border-l-vmap-orange'
                                    : 'hover:bg-gray-50'
                                    }`}
                            >
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        className="py-3 px-4 text-sm text-vmap-text-secondary"
                                    >
                                        {column.render
                                            ? column.render(row[column.key], row)
                                            : row[column.key]}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {data.length === 0 && (
                <div className="text-center py-8 text-vmap-text-secondary">
                    No data available
                </div>
            )}
        </div>
    );
}
