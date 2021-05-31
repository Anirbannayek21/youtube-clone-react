import React, { useEffect } from 'react'
import { Col, Container } from 'react-bootstrap'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import Skeletons from '../../components/skeleton/Skeleton'
import Video from '../../components/video/Video'
import { get_videos_by_catagory, popularVideo } from '../../redux/action/video.action'


const Homescreen = () => {
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(popularVideo())
    }, [dispatch])


    const { videos, activeCatagory, loading } = useSelector(state => state.video)

    useEffect(() => {
        document.title = (activeCatagory === "all" ? "Youtube" : `${activeCatagory}-Youtube`)
    }, [activeCatagory])

    const fatchData = () => {
        if (activeCatagory === "all") {
            dispatch(popularVideo())
        } else {
            dispatch(get_videos_by_catagory(activeCatagory))
        }
    }



    return (
        <Container style={{ paddingLeft: "3rem", paddingRight: "3rem", marginTop: "5rem" }}>
            <InfiniteScroll
                dataLength={videos.length}
                next={fatchData}
                hasMore={true}
                loader={
                    <div className="spinner-border text-danger d-block mx-auto">
                    </div>
                }
                className="row"
            >
                {!loading ?
                    videos.map((video) => (
                        <Col sm={6} lg={3} md={4} key={video.id?.videoId || video.id}>
                            <Video video={video} />
                        </Col>
                    )) :
                    [...new Array(20)].map(() =>
                        <Col sm={6} lg={3} md={4}>
                            <Skeletons />
                        </Col>
                    )
                }
            </InfiniteScroll>

        </Container >
    )
}

export default Homescreen
