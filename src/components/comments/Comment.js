import React, { useEffect, useState } from 'react'
import "./_comment.scss"
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import moment from 'moment'
import { addComment, commentsDetails } from '../../redux/action/video.action'


const Comment = ({ id, video }) => {
    const [text, settext] = useState("")
    const [commentCount, setcommentCount] = useState(0)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(commentsDetails(id))
        video ? setcommentCount(video.statistics.commentCount) : setcommentCount(0)
    }, [video])

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(addComment(id, text))
        settext("")
    }
    const comment = useSelector(state => state.comments.data)

    const _comments = comment ? comment.data.items.map(comments => comments.snippet.topLevelComment.snippet) : null

    // console.log(_comments);

    const profilePic = useSelector(state => state.auth.user.photoUrl)
    return (
        <div className="comments">
            <div className="comments_number">{commentCount} comments</div>
            <div className="comments_form d-flex w-100 my-2">
                <img src={profilePic} alt="" />
                <input
                    placeholder="Write your comment..."
                    value={text}
                    onChange={(e) => settext(e.target.value)}
                />
                <button className="border-0" onClick={handleClick}>comment</button>
            </div>
            {comment ? _comments.map((val) =>
                <div className="comments_body d-flex align-items-lg-start">
                    <Row>
                        <Col xs={2} sm={2} md={2} lg={2} className="img">
                            <img src={val.authorProfileImageUrl} alt="" />
                        </Col>
                        <Col xs={9} sm={9} md={9} lg={9} className="message">
                            <div>
                                <span>{val.authorDisplayName}</span>  • {moment(val.publishedAt).fromNow()}
                            </div>
                            <div className="msg">
                                {val.textOriginal}
                            </div>
                        </Col>
                    </Row>
                </div>
            ) : null}

        </div>
    )
}

export default Comment
