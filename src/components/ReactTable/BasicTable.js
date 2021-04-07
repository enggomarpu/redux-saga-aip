import React, { useMemo } from 'react'
import { useTable, useGlobalFilter, useSortBy, usePagination } from 'react-table'
import MOCK_DATA from './MOCK_DATA.json'
import { COLUMNS } from './column'
import './table.css'
import GlobalFilter from './GlobalFilter'

const BasicTable = () => {

    const columns = useMemo (() => COLUMNS, [])
    const data = useMemo (() => MOCK_DATA, [])    
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        prepareRow,
        state,
        setGlobalFilter,

    } = useTable ({
        columns,
        data

   }, useGlobalFilter, useSortBy, usePagination)


   const {globalFilter} = state 
    return (

        <>
         {/* <Header />
         <div className="main">
        <div className="siderbar">
          <Sidebar />
        </div> */}
    
        <GlobalFilter filter = {globalFilter} setFilter = {setGlobalFilter} />
        <table className="table" {...getTableProps()}>
            <thead>
               {headerGroups.map(headerGroups => (
                <tr {...headerGroups.getHeaderGroupProps()}>
                {headerGroups.headers.map((column) => (
                    <th scope="col" {...column.getHeaderProps(column.getSortByToggleProps())}> 
                    {column.render('Header')}
                    <span>
                        {column.isSorted ? (column.isSortedDesc ? ''  : '' ): '' }
                    </span>
                    </th>
                ))}
                    
                 </tr>

               ))}
                 
            </thead>
            <tbody {...getTableBodyProps()}>
            {page.map((row ) => {
               prepareRow(row)
               return (
                <tr {...row.getRowProps()}>
                    {
                        row.cells.map( cell => {
                          return  <td {...cell.getCellProps()}>
                          {cell.render('Cell')}
                            </td> 
                            
                        })
                    }
                    
                 </tr>
            )})}
                 
            </tbody>
        </table>
        <div>
            <button onClick = {() => previousPage()} disabled= {!canPreviousPage}>Previous</button>
            <button onClick = {() => nextPage()} disabled= {!canNextPage}>Next</button>
        </div>
        
       
        </>
    )
}

export default BasicTable;