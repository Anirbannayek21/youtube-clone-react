import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';
import { Col, Row } from 'react-bootstrap';

const Skeletons = () => {
    return (
        <div style={{ marginBottom: "1rem" }}>
            <Skeleton variant="rect" style={{ backgroundColor: "#4c4c4c", marginBottom: "3px" }} width="100%" height="20vh" />
            <Row>
                <Col lg={3} sm={3} sm={3} xs={3}>
                    <Skeleton variant="circle" style={{ backgroundColor: "#4c4c4c", marginBottom: "3px" }} width={40} height={40} />
                </Col>
                <Col lg={9} sm={9} sm={9} xs={9}>
                    <Skeleton variant="text" style={{ backgroundColor: "#4c4c4c", marginBottom: "3px" }} />
                    <Skeleton variant="text" style={{ backgroundColor: "#4c4c4c", marginBottom: "3px" }} width="50%" />
                </Col>
            </Row>

        </div>
    )
}

export default Skeletons
