import './index.scss'

export default function NotFound() {
    
    return (
        <div className='pagina-NotFound'>
            <img src="/assets/images/imageNotFound.svg" alt="" />    
            <hr />
            <div>
                <h1>404</h1>
                <p>Está pagina não existe</p>
            </div>
        </div>  
    );

}