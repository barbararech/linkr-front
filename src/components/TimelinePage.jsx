import Header from "./Header.jsx"
import {Helmet} from "react-helmet";

export default function TimelinePage (){
    return (
        <>
            <Helmet>
                <style>{"body { background-color: #333333; }"}</style>
            </Helmet>
            <Header/>
        </>
    )
}