import moment from 'moment'
import numeral from 'numeral'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axiosInstance from '../../axios';
import { MdVisibility } from "react-icons/md"

import "./_videoHorizantal.scss"
import { useHistory } from 'react-router';

const VideHorizental = ({ video }) => {
    const [duration, setduration] = useState(0)
    const [views, setviews] = useState(0)
    const history = useHistory();

    const { id, snippet: {
        thumbnails,
        publishedAt,
        title,
        channelTitle
    } } = video

    const _videoId = id?.videoId || id; //check id is object or not

    useEffect(() => {
        const get_video_details = async () => {
            const { data: { items } } = await axiosInstance.get("/videos", {
                params: {
                    part: "contentDetails,statistics",
                    id: _videoId,
                }
            })

            setduration(items[0].contentDetails.duration)
            setviews(items[0].statistics.viewCount)
        }
        get_video_details();
    }, [_videoId])


    const showVideo = () => {
        history.push(`/watch/${_videoId}`)
    }

    const second = moment.duration(duration).asSeconds()
    const durationTime = moment.utc(second * 1000).format("mm:ss")
    return (
        <div onClick={showVideo}>
            <Row className="videoHor m-1 mt-0 pb-2 ">
                <Col xs={6} md={5} lg={5} className="videoHor_left">
                    <LazyLoadImage
                        width="100%"
                        src={thumbnails.medium.url}
                        className="videoHor_left_thubmnail"
                        wrapperClassName="videoHor_left_thubmnail_wrapper"
                    />
                    <span className="videoHor_left_duration">{durationTime}</span>
                </Col>
                <Col xs={6} md={7} lg={7} className="videoHor_right p-0" >
                    <div className="videoHor_title mb-1">
                        {title}
                    </div>
                    <div className="videoHor_details">
                        <h6>{channelTitle}</h6>
                        <span><MdVisibility />{"  " + numeral(views
                        ).format("0.a")} {" "}views • {moment(publishedAt).fromNow()}</span>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default VideHorizental
