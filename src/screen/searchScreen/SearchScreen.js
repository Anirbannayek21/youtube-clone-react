import Skeleton from '@material-ui/lab/Skeleton'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import Header from '../../components/header/Header'
import SearchVideoHar from '../../components/searchVideoHor/SearchVideoHar'
import Sidebar from '../../components/sidebar/Sidebar'
import { get_videos_by_catagory } from '../../redux/action/video.action'
import "./_searchScreen.scss"

const SearchScreen = () => {
    const dispatch = useDispatch();
    const catagory = useParams();

    useEffect(() => {
        dispatch(get_videos_by_catagory(catagory));
    }, [])



    const [toggleSidebar, settoggleSidebar] = useState(false)

    const handleToggleSidebar = () => settoggleSidebar(!toggleSidebar)

    const handleOff = () => settoggleSidebar(false);

    const { videos, nextPageToken, loading } = useSelector(state => state.video)
    return (
        <>
            <Header handleToggleSidebar={handleToggleSidebar} />
            <div className="searchapp_container ">
                <div className="searchapp_sidebar">
                    <Sidebar sidebar={toggleSidebar} handleOff={handleOff} notShow={false} />
                </div>
                <Container fluid className="searchapp_main">
                    {!loading && videos ?
                        videos.map((video, i) => (<SearchVideoHar video={video} key={i} />)) :
                        [...Array(15)].map(() => (<div style={{ marginBottom: "15px" }}>
                            <Row>
                                <Col xs={6} md={3} lg={3} ml-0>
                                    <Skeleton variant="rect" style={{ backgroundColor: "#4c4c4c", marginBottom: "3px" }} width="100%" height="20vh" />
                                </Col>
                                <Col xs={6} md={9} lg={9}>
                                    <Skeleton variant="text" style={{ backgroundColor: "#4c4c4c", marginBottom: "3px" }} />
                                    <Skeleton variant="text" style={{ backgroundColor: "#4c4c4c", marginBottom: "3px" }} width="50%" />
                                </Col>
                            </Row>
                        </div>))}
                </Container>
            </div>
        </>
    )
}

export default SearchScreen
