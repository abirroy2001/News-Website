import React, { Component} from 'react'
import NwesItem from './NwesItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component{
    
    articles= [
        {
            "source": {
                "id": "espn-cric-info",
                "name": "ESPN Cric Info"
            },
            "author": null,
            "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
            "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
            "publishedAt": "2020-04-27T11:41:47Z",
            "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
        },
        {
            "source": {
                "id": "espn-cric-info",
                "name": "ESPN Cric Info"
            },
            "author": null,
            "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
            "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
            "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
            "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
            "publishedAt": "2020-03-30T15:26:05Z",
            "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
        }
    ]
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    // const  [articles,setarticles]=useState([]);
    // const[loading, setloading]=useState(false);
    // const[page,setpage]=useState(1);
    // const[totalResults,settotalresults]=useState(0);
    // document.title=`${ props.category} - NewsFast`;
    constructor(props){
        super(props);
        this.state={
            articles: this.articles,
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title=`${this.props.category} - NewsFast`;
    }
    updateNews=async ()=>{
        this.props.setProgress(10);
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${ this.props.category}&apiKey=75ae14cd843641e1bcf185225f2e0fb4&page=${this.props.page}&pageSize=${ this.props.pageSize}`
        this.setState({ loading: true });
        let data=await fetch(url)
        let parsData=await data.json()
        // setarticles( parsData.articles)
        // settotalresults(parsData.totalResults)
        // setloading(false)
        this.setState({
            articles: parsData.articles, 
            totalResults: parsData.totalResults,
            loading: false
        })
         this.props.setProgress(100)
    }
    // useEffect(()=>{
    //     updateNews();
    // })
   componentDidMount=async()=>{
        this.updateNews();
    }
    fetchMoreData = async () => {
        let nextPage = this.state.page + 1; // Increment page number
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=75ae14cd843641e1bcf185225f2e0fb4&page=${nextPage}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsData = await data.json();
        // Update state after fetching new data
        this.setState({
            articles: this.state.articles.concat(parsData.articles),
            totalResults: parsData.totalResults,
            loading: false,
            page: nextPage // Update page number in the state
        });
    };
    
    // handlePrev=async ()=>{
    //     this.setState({page: this.state.page-1});
    //     this.updateNews();
    // }
    // handleNext=async ()=>{
    //     this.setState({page: this.state.page+1});
    //     this.updateNews();
    // }
    render(){
        return (
            <>
              
              <h2 className='text-center' style={{margin: "70px 20px 20px"}}>NewsFast-Top Headlines</h2>
               {this.state.loading&&<Spinner />}
              {/*<div className="row">
                  {!this.state.loading && this.state.articles.map((element)=>{
                      return <div className="col-md-3">
                      <NwesItem title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""} imageUrl={element.urlToImage?element.urlToImage:"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                      </div>}
                  )    
        }
              </div> */}
               <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                > 
                    <div className="container">
                         
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-3" key={element.url}>
                                <NwesItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage?element.urlToImage:"https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg"} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>
              {/* <div class="d-flex justify-content-between" style={{margin: "20px"}}>
              <button disabled={this.state.page<=1}  type="button" class="btn btn-outline-primary" onClick={this.handlePrev}>&larr;Prev</button>
              <button disabled={(this.state.page+1)> Math.ceil(this.state.totalResults/ props.pageSize)} type="button" class="btn btn-outline-primary" onClick={this.handleNext}>Next&rarr;</button>
              </div> */}
            
            </>
            
          );
    }
  
}
