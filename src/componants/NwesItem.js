import React, { Component } from 'react'

export default class NwesItem extends Component {
  render() {
    let {title,description,imageUrl,newsUrl,author,date,source}=this.props;
    return (
      <div>
        <div className="card " style={{}} >
        <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: 0}}>
        <span class="badge rounded-pill bg-danger" >
                  {source}
                
              </span>
        </div>
            <img src={imageUrl} class="card-img-top" alt="..." style={{ maxHeight: '200px', objectFit: 'cover', width: '100%' }}/>
            <div className="card-body" style={{textAlign: "center"}}>
                <h5 className="card-title">{title}... </h5>
                <p className="card-text">{description}...</p>
                <p class="card-text"><small  className="text-primary">by {!author ? "unknown":author} on {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} target="_blank" className="btn btn-primary" rel="noreferrer">Go somewhere</a>
            </div>
        </div>
      </div>
    )
  }
}
