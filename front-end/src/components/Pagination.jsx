import { useContext, useMemo } from "react";
import { AppContext } from "./../Context";


export default function Pagination({ count, activePage, setActivePage }) {

    const Context = useContext(AppContext);

    const buttonsInfo = useMemo(() => {
        const pageButtons = [];

        let start = activePage > 1 ? activePage - 2 : Context.FIRST_PAGE_INDEX;
        let lastPage = Math.ceil(count / Context.MAX_TASKS_PER_PAGE);
    
        let end = start + Context.MAX_PAGINATION_PAGES > lastPage ? lastPage : start + Context.MAX_PAGINATION_PAGES;
    
        if(lastPage > Context.MAX_PAGINATION_PAGES - 1 && end - start < Context.MAX_PAGINATION_PAGES) {
            start = end - Context.MAX_PAGINATION_PAGES;
        }

        for (let i = start; i < end; i++) {
            pageButtons.push(<button key={i} className={i === activePage ? "button-pag-selected" : ""} onClick={() => setActivePage(i)}>{i + 1}</button>)
        } 

        return {
            buttons: pageButtons,
            lastPage
        }
    }, [activePage, count, Context.MAX_PAGINATION_PAGES, Context.FIRST_PAGE_INDEX, Context.MAX_TASKS_PER_PAGE, setActivePage]);

    return (
        <div className="pagination">
            <button onClick={() => setActivePage(Context.FIRST_PAGE_INDEX)}>{'<<'}</button>
            <button disabled={activePage <= Context.FIRST_PAGE_INDEX} onClick={() => setActivePage(activePage - 1)}>{'<'}</button>
            {buttonsInfo.buttons}
            <button disabled={activePage >= buttonsInfo.lastPage - 1} onClick={() => setActivePage(activePage + 1)}>{'>'}</button>
            <button onClick={() => setActivePage(buttonsInfo.lastPage - 1)}>{'>>'}</button>
        </div>
    )
}