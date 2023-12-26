import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'

const ScrollableChat = ({ messages }) => {
    return (
        <ScrollableFeed>
            {
                messages &&
                messages.map(message => {

                })
            }
        </ScrollableFeed>
    )
}

export default ScrollableChat