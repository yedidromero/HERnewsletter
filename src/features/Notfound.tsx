const NotFound = ()=>{
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="text-center">Opps!</h3>
                            <h5 className="text-center text-danger">We can not find page, you requested!</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound;