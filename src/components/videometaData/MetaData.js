import moment from 'moment'
import numeral from 'numeral'
import React, { useEffect } from 'react'
import ShowMoreText from "react-show-more-text"
import "./_metaData.scss"

import { MdThumbUp, MdThumbDown } from "react-icons/md"
import { IoMdShareAlt } from "react-icons/io"
import { Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { channelDetails, subcriptionDetails } from '../../redux/action/cannel.action'

const MetaData = ({ video }) => {
    const dispatch = useDispatch();
    const { snippet, statistics } = video;

    useEffect(async () => {
        document.title = snippet.title
        dispatch(channelDetails(snippet.channelId))
        dispatch(subcriptionDetails(snippet.channelId))
    }, [])

    const { data, loading } = useSelector(state => state.channel)

    const sub = useSelector(state => state.subcription)

    return (
        <div className="videometaData py-2">
            <div className="videometaData_top">
                <h5>{snippet.title}</h5>
                <div className="d-flex justify-content-between align-items-center py-1">
                    <span>{"  " + numeral(statistics.viewCount).format("0.a")} {" "}views • {moment(snippet.publishedAt).fromNow()}</span>
                    <div>
                        <span className="like">
                            <MdThumbUp size={22} /><span>{" "}{numeral(statistics.likeCount).format("0.a")}</span>
                        </span>
                        <span className="like">
                            <MdThumbDown size={22} /><span>{" "}{numeral(statistics.dislikeCount).format("0.a")}</span>
                        </span>
                        <span className="like">
                            <IoMdShareAlt size={22} /><span>{" "}share</span>
                        </span>
                    </div>
                </div>

            </div>
            <hr />
            <div className="videometaData_channel mt-3">
                <Row>
                    <Col xs={2} sm={1} md={1} lg={1}>
                        <img
                            src={!loading ? data.snippet.thumbnails.medium.url : ""}
                            alt="" />
                    </Col>
                    <Col className="d-flex flex-column" xs={5} sm={9} md={9} lg={9}>
                        <h6>{snippet.channelTitle}</h6>
                        <span className="sub">{numeral(!loading ? data.statistics.subscriberCount : 0).format("0.a")} subscriber</span>
                    </Col>
                    <Col xs={5} sm={2} md={2} lg={2} className="d-flex ">
                        <button className={!sub.data ? " subbutton bg-danger border-0" : "subbutton subscribed border-0"}>{!sub.data ? "subscribe" : 'subscribed'}</button>
                        {/* <button>sub</button> */}
                    </Col>
                </Row>
            </div>
            <div className="videometaData_description mt-3">
                <Row>
                    <Col xs={2} sm={1} md={1} lg={1}>
                    </Col>
                    <Col xs={10} sm={10} md={10} lg={10}>
                        <ShowMoreText
                            line={3}
                            more="SHOW MORE"
                            less="SHOW LESS"
                            anchorClass='showMoreText'
                            expanded={false}
                        >{snippet.description}</ShowMoreText>
                    </Col>
                </Row>
            </div>
            <hr />
        </div>
    )
}

export default MetaData


// { channelDetails.data.items[0].snippet.thumbnails.medium.url }