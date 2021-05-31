import Skeleton from '@material-ui/lab/Skeleton'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/header/Header'
import SearchVideoHar from '../../components/searchVideoHor/SearchVideoHar'
import Sidebar from '../../components/sidebar/Sidebar'
import { subscribtedChannel } from '../../redux/action/cannel.action'
import "./_subcription.scss"


const Horchannel = ({ channel }) => {
    const {
        contentDetails: {
            totalItemCount
        },
        snippet: {
            description,
            thumbnails: {
                medium: {
                    url
                }
            },
            title
        }
    } = channel
    return (
        <>
            < Row className="horChannel">
                <Col xs={5} sm={4} md={3} lg={3} className="horChannel_left">
                    <img src={url} alt="" />
                </Col>
                <Col xs={7} sm={8} md={9} lg={9} className="horChannel_right">
                    <h3>{title}</h3>
                    <span className="horChannel_right_description">{description}</span>

                    <span className="horChannel_right_video">{totalItemCount}{" "}videos</span>
                </Col>
            </Row>
            <hr />
        </>
    )
}

const Subcription = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(subscribtedChannel())
    }, [])



    const [toggleSidebar, settoggleSidebar] = useState(false)

    const handleToggleSidebar = () => settoggleSidebar(!toggleSidebar)

    const handleOff = () => settoggleSidebar(false);

    const { channels, loading } = useSelector(state => state.subscribedChannels)
    return (
        <>
            <Header handleToggleSidebar={handleToggleSidebar} />
            <div className="subcriptionapp_container ">
                <div className="subcriptionapp_sidebar">
                    <Sidebar sidebar={toggleSidebar} handleOff={handleOff} notShow={false} />
                </div>
                <Container fluid className="subcriptionapp_main">
                    {!loading && channels ?
                        channels.map((channel, i) => (<Horchannel channel={channel} key={i} />)) :
                        [...Array(10)].map(() => (<div style={{ marginBottom: "15px" }}>
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

export default Subcription
