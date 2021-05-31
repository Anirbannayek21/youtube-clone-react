import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Comment from '../../components/comments/Comment'
import Header from '../../components/header/Header'
import MetaData from '../../components/videometaData/MetaData'
import VideHorizental from '../../components/videosHorizental/VideHorizental'
import { Hidden } from "@material-ui/core"
import "./_watchScreen.scss"
import Sidebar from '../../components/sidebar/Sidebar'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getVideo_details, get_related_video } from '../../redux/action/video.action'
import Skeleton from '@material-ui/lab/Skeleton'

const WatchScreen = () => {
    const { id } = useParams();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getVideo_details(id))
        dispatch(get_related_video(id))
    }, [dispatch, id])

    const [toggleSidebar, settoggleSidebar] = useState(false)

    const handleToggleSidebar = () => settoggleSidebar(!toggleSidebar)

    const handleOff = () => settoggleSidebar(false);

    const { data, loading } = useSelector(state => state.related)

    const { videos, loading: relatedVideoLoading } = useSelector(state => state.videoRelatedVideo)


    return (
        <div className="watchScreen">
            <Header handleToggleSidebar={handleToggleSidebar} present={true} />
            <div className="watchScreen_sidebar">
                <Sidebar sidebar={toggleSidebar} handleOff={handleOff} notShow={true} />
            </div>
            <Container fluid style={{ width: "90vw" }}>
                <Row>
                    <Col lg={8}>
                        <div className="watchScreen_player">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${id}?autoplay=1`}
                                allow='autoplay'
                                allowFullScreen
                            ></iframe>
                        </div>
                        <br />
                        {!loading ? <MetaData video={data} /> : <h6>loading...</h6>}
                        <Hidden xsDown>
                            <Comment id={id} video={data} />
                        </Hidden>
                    </Col>
                    <Col lg={4}>
                        {
                            relatedVideoLoading && !videos ?
                                [...Array(15)].map(() => (<div style={{ marginBottom: "15px" }}>
                                    <Row>
                                        <Col xs={6} md={5} lg={5} ml-0>
                                            <Skeleton variant="rect" style={{ backgroundColor: "#4c4c4c", marginBottom: "3px" }} width="100%" height="12vh" />
                                        </Col>
                                        <Col xs={6} md={7} lg={7}>
                                            <Skeleton variant="text" style={{ backgroundColor: "#4c4c4c", marginBottom: "3px" }} />
                                            <Skeleton variant="text" style={{ backgroundColor: "#4c4c4c", marginBottom: "3px" }} width="50%" />
                                        </Col>
                                    </Row>
                                </div>)) :
                                videos.filter(video => video.snippet).map((video, i) => <VideHorizental video={video} key={i} />)
                        }
                        <Hidden smUp>
                            <hr />
                            <Comment />
                        </Hidden>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default WatchScreen
