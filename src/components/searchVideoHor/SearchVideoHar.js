import moment from 'moment'
import numeral from 'numeral'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axiosInstance from '../../axios';
import { MdVisibility } from "react-icons/md"

import "./_searchVideoHor.scss"
import { useHistory } from 'react-router';

const SearchVideoHar = ({ video }) => {
    const [channelIcon, setchannelIcon] = useState(null)
    const [duration, setduration] = useState(0)
    const [views, setviews] = useState(0)
    const history = useHistory();

    const { id, snippet: {
        channelId,
        thumbnails,
        publishedAt,
        title,
        channelTitle,
        description
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

    useEffect(() => {
        const get_channel_img = async () => {
            const { data: { items } } = await axiosInstance.get("/channels", {
                params: {
                    part: "snippet",
                    id: channelId
                }
            })
            setchannelIcon(items[0].snippet.thumbnails.medium.url)
        }
        get_channel_img()
    }, [channelId])


    const showVideo = () => {
        history.push(`/watch/${_videoId}`)
    }

    const second = moment.duration(duration).asSeconds()
    const durationTime = moment.utc(second * 1000).format("mm:ss")
    return (
        <div onClick={showVideo} className="mb-3">
            <Row className="searchvideoHor m-1 mt-0 pb-2 ">
                <Col xs={6} md={3} lg={3} className="searchvideoHor_left">
                    <LazyLoadImage
                        width="100%"
                        src={thumbnails.medium.url}
                        className="searchvideoHor_left_thubmnail"
                        wrapperClassName="searchvideoHor_left_thubmnail_wrapper"
                    />
                    <span className="searchvideoHor_left_duration">{durationTime}</span>
                </Col>
                <Col xs={6} md={9} lg={9}  >
                    <div className="searchvideoHor_title">
                        {title}
                    </div>
                    <div className="searchvideoHor_details">
                        <span><MdVisibility />{"  " + numeral(views
                        ).format("0.a")} {" "}views • {moment(publishedAt).fromNow()}</span>
                    </div>

                    <div className="searchvideoHor_chn my-3">
                        <img src={channelIcon} alt="" />
                        <h6>{channelTitle}</h6>
                    </div>

                    <div className="searchvideoHor_dsc mb-1">
                        {description}
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default SearchVideoHar
