import React from 'react'
import { Layout, Button } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    WalletFilled
} from '@ant-design/icons';
import { headerStyle } from '../../styles/CommonStyles';
import UseWindowDimensions from '../../utils/size';

const { Header } = Layout;


export const CustomHeader = ({ onClick, collapsed }) => {
    const { height } = UseWindowDimensions();

    return (
        <Header
            style={{
                ...headerStyle,
                height: height * .1,
            }}>
            <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={onClick}
                style={{
                    fontSize: '16px',
                    width: 44,
                    height: 44,
                }}
            />
            <Button
                icon={<WalletFilled />}
            >Connect Wallet
            </Button>
        </Header>
    )
}
