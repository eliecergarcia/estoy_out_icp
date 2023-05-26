import React from 'react'
import { Layout } from 'antd';
import { footerStyle } from '../../styles/CommonStyles';
import { Col, Row } from "antd"
import UseWindowDimensions from '../../utils/size';

const { Footer } = Layout;


export const CustomFooter = () => {
    const { height, } = UseWindowDimensions();
    const year = new Date().getFullYear();

    return (
        <Footer
            style={{
                ...footerStyle,
            }}>
            <Row justify="center">
                <Col span={24}>
                    <p>
                        The Internet Computer's largest digital marketplace for crypto
                        collectibles and non-fungible tokens (NFTs). Buy, sell, and
                        discover exclusive digital items.
                    </p>
                </Col>
                <Col>
                    <p>Copyright ⓒ {year}</p>
                </Col>
            </Row>
        </Footer>
    )
}
