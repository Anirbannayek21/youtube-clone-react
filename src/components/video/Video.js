import React, { useEffect, useState } from 'react'
import "./_video.scss"
import { MdVisibility } from "react-icons/md"
import { useHistory } from 'react-router'
import { Col, Row } from "react-bootstrap"
import axiosInstance from '../../axios'
import moment from 'moment'
import numeral from 'numeral'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Video = ({ video }) => {
    const history = useHistory();
    const [views, setviews] = useState(null)
    const [duration, setduration] = useState(null)
    const [channelIcon, setchannelIcon] = useState(null)

    const second = moment.duration(duration).asSeconds()
    const durationTime = moment.utc(second * 1000).format("mm:ss")

    const {
        id,
        snippet: {
            channelId,
            title,
            channelTitle,
            publishedAt,
            thumbnails: {
                medium
            }
        }
    } = video

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

    const videoHandler = (vId) => {
        history.push(`/watch/${vId}`)
    }

    return (
        <div className="video" onClick={() => videoHandler(_videoId)}>
            <div className="video_top">
                {/* <img src={medium.url} alt="" /> */}
                <LazyLoadImage src={medium.url} />
                <span className="video_top_duration">{durationTime}</span>

            </div>
            <Row style={{ marginTop: "1.1rem" }}>
                <Col xs={3} lg={3} md={3} sm={3} style={{ display: "flex", justifyContent: 'center' }}>
                    <LazyLoadImage src={channelIcon} className="channel-logo" />
                </Col>
                <Col xs={9} lg={9} md={9} sm={9} style={{ paddingLeft: "2px" }}>
                    <div className="video_title">
                        {title}
                    </div>
                    <div className="video_channel">

                        <span>{channelTitle}</span>
                    </div>
                    <div className="video_views">
                        <MdVisibility />
                        <span>{"  " + numeral(views).format("0.a")} {" "}views • {moment(publishedAt).fromNow()}</span>
                    </div>
                </Col>
            </Row>
        </div >
    )
}

export default Video


