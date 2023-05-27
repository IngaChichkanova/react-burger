import React, { FC, HTMLAttributes } from 'react';
import feedsStyles from './feeds.module.css';
import Feed from '../components/feed/feed';
import FeedPanel from '../components/feed-panel/feed-panel';

export const FeedPage: FC<HTMLAttributes<HTMLHtmlElement>> = () => {

    return (
        <main className={`${feedsStyles.main}`}>
            <Feed />
            <FeedPanel />
        </main>
    );
};