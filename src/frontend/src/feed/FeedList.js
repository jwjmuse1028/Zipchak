import React from 'react';
import "../css/FeedList.css";
import noimg from './noimage.jpg';

function FeedList(props) {
    return (
        <div className="feed_container">
        <h1>FeedList</h1>
        <div className="virtualized-list row"
             style={{paddingTop: '0px', paddingBottom: "0px", transform: "translateY(0px)"}}>
            <div className="col-12 col-md-4">
                <article className="project-feed__item"><a className="project-feed__item__link"
                                                           href="/projects/130370/detail?affect_type=ProjectSelfIndex&amp;affect_id=0"></a>
                    <div className="project-feed__item__image"><img className="image" alt=""
                                                                    src="https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/166661001261289509.jpg?gif=1&amp;w=480&amp;h=320&amp;c=c&amp;q=80&amp;webp=1"
                                                                    srcSet="https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/166661001261289509.jpg?gif=1&amp;w=640&amp;h=427&amp;c=c&amp;q=80&amp;webp=1 1.5x,https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/166661001261289509.jpg?gif=1&amp;w=850&amp;h=567&amp;c=c&amp;q=80&amp;webp=1 2x,https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/166661001261289509.jpg?gif=1&amp;w=1280&amp;h=854&amp;c=c&amp;q=80&amp;webp=1 3x"/><span
                        className="project-feed__item__image__new" aria-label="NEW"><svg className="icon" width="36"
                                                                                         height="20"
                                                                                         viewBox="0 0 36 20"
                                                                                         preserveAspectRatio="xMidYMid meet"><g
                        fill="none" fill-rule="evenodd"><rect width="36" height="20" fill="#FDBD39" rx="4"></rect><path
                        fill="#FFF" fill-rule="nonzero"
                        d="M6 14V6h1.668l3.446 5.644h.036V6h1.318v8h-1.475L7.354 7.97h-.036V14H6zm8.414 0V6h5.174v1.131h-3.687v2.193h2.865v1.12h-2.865v2.425h3.76V14h-5.247zm8.317 0l-2.067-8h1.511l1.414 5.924h.037L25.318 6h1.21l1.667 5.924h.037L29.658 6H31l-2.03 8h-1.476l-1.62-5.808h-.036L24.194 14H22.73z"></path></g></svg></span>
                        <button className="project-feed__item__image__scrap" type="button" aria-label="스크랩">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 className="icon">
                                <defs>
                                    <path id="scrap-icon-71-b"
                                          d="M12.472 6.93l7.056-3.811A1 1 0 0 1 21 4.002v15.496c0 .83-.672 1.502-1.5 1.502h-15c-.828 0-1.5-.673-1.5-1.502V4.002a1 1 0 0 1 1.472-.883l7.056 3.811a.999.999 0 0 0 .944 0z"></path>
                                    <filter id="scrap-icon-71-a" width="150%" height="150%" x="-25%" y="-25%"
                                            filterUnits="objectBoundingBox">
                                        <feOffset in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                                        <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1"
                                                        stdDeviation="1.5"></feGaussianBlur>
                                        <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out"
                                                     result="shadowBlurOuter1"></feComposite>
                                        <feColorMatrix in="shadowBlurOuter1"
                                                       values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.26 0"></feColorMatrix>
                                    </filter>
                                    <filter id="scrap-icon-71-c" width="150%" height="150%" x="-25%" y="-25%"
                                            filterUnits="objectBoundingBox">
                                        <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1"
                                                        stdDeviation="1.5"></feGaussianBlur>
                                        <feOffset in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
                                        <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1"
                                                     operator="arithmetic" result="shadowInnerInner1"></feComposite>
                                        <feColorMatrix in="shadowInnerInner1"
                                                       values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"></feColorMatrix>
                                    </filter>
                                </defs>
                                <g fill="none" fill-rule="nonzero" transform="matrix(1 0 0 -1 0 24)">
                                    <use fill="#000" filter="url(#scrap-icon-71-a)" href="#scrap-icon-71-b"></use>
                                    <use fill="#FFF" fill-opacity=".4" href="#scrap-icon-71-b"></use>
                                    <use fill="#000" filter="url(#scrap-icon-71-c)" href="#scrap-icon-71-b"></use>
                                    <path stroke="#FFF"
                                          d="M12.71 7.37h-.002a1.5 1.5 0 0 1-1.417 0L4.236 3.56a.499.499 0 0 0-.736.442v15.496c0 .553.448 1.002 1 1.002h15c.552 0 1-.449 1-1.002V4.002a.499.499 0 0 0-.734-.443l-7.057 3.81zm-.475-.88h-.001z"></path>
                                </g>
                            </svg>
                        </button></div>
                    <h1 className="project-feed__item__title">리모델링 없이도 마음에 쏙! 차분한 톤의 24평 신혼집</h1>
                    <address className="project-feed__item__writer-wrap"><a className="project-feed__item__writer"
                                                                            href="/users/5940593?affect_type=ProjectSelfIndex&amp;affect_id=0"><img
                        className="project-feed__item__writer__image" alt=""
                        src="https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/166806673547605371.jpeg?gif=1&amp;w=36&amp;h=36&amp;c=c&amp;webp=1"
                        srcSet="https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/166806673547605371.jpeg?gif=1&amp;w=72&amp;h=72&amp;c=c&amp;webp=1 1.5x,https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/166806673547605371.jpeg?gif=1&amp;w=72&amp;h=72&amp;c=c&amp;webp=1 2x,https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/166806673547605371.jpeg?gif=1&amp;w=144&amp;h=144&amp;c=c&amp;webp=1 3x"/><span
                        className="project-feed__item__writer__name">nuoy-haus</span></a></address>
                    <footer className="project-feed__item__status"><span className="entry">스크랩 29&nbsp;</span><span
                        className="entry">조회 1,104</span></footer>
                </article>
            </div>
            <div className="col-12 col-md-4">
                <article className="project-feed__item"><a className="project-feed__item__link"
                                                           href="/projects/129704/detail?affect_type=ProjectSelfIndex&amp;affect_id=1"></a>
                    <div className="project-feed__item__image"><img className="image" alt=""
                                                                    src="https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/166539052596327079.jpg?gif=1&amp;w=480&amp;h=320&amp;c=c&amp;q=80&amp;webp=1"
                                                                    srcSet="https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/166539052596327079.jpg?gif=1&amp;w=640&amp;h=427&amp;c=c&amp;q=80&amp;webp=1 1.5x,https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/166539052596327079.jpg?gif=1&amp;w=850&amp;h=567&amp;c=c&amp;q=80&amp;webp=1 2x,https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/166539052596327079.jpg?gif=1&amp;w=1280&amp;h=854&amp;c=c&amp;q=80&amp;webp=1 3x"/><span
                        className="project-feed__item__image__new" aria-label="NEW"><svg className="icon" width="36"
                                                                                         height="20"
                                                                                         viewBox="0 0 36 20"
                                                                                         preserveAspectRatio="xMidYMid meet"><g
                        fill="none" fill-rule="evenodd"><rect width="36" height="20" fill="#FDBD39" rx="4"></rect><path
                        fill="#FFF" fill-rule="nonzero"
                        d="M6 14V6h1.668l3.446 5.644h.036V6h1.318v8h-1.475L7.354 7.97h-.036V14H6zm8.414 0V6h5.174v1.131h-3.687v2.193h2.865v1.12h-2.865v2.425h3.76V14h-5.247zm8.317 0l-2.067-8h1.511l1.414 5.924h.037L25.318 6h1.21l1.667 5.924h.037L29.658 6H31l-2.03 8h-1.476l-1.62-5.808h-.036L24.194 14H22.73z"></path></g></svg></span>
                        <button className="project-feed__item__image__scrap" type="button" aria-label="스크랩">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 className="icon">
                                <defs>
                                    <path id="scrap-icon-72-b"
                                          d="M12.472 6.93l7.056-3.811A1 1 0 0 1 21 4.002v15.496c0 .83-.672 1.502-1.5 1.502h-15c-.828 0-1.5-.673-1.5-1.502V4.002a1 1 0 0 1 1.472-.883l7.056 3.811a.999.999 0 0 0 .944 0z"></path>
                                    <filter id="scrap-icon-72-a" width="150%" height="150%" x="-25%" y="-25%"
                                            filterUnits="objectBoundingBox">
                                        <feOffset in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                                        <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1"
                                                        stdDeviation="1.5"></feGaussianBlur>
                                        <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out"
                                                     result="shadowBlurOuter1"></feComposite>
                                        <feColorMatrix in="shadowBlurOuter1"
                                                       values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.26 0"></feColorMatrix>
                                    </filter>
                                    <filter id="scrap-icon-72-c" width="150%" height="150%" x="-25%" y="-25%"
                                            filterUnits="objectBoundingBox">
                                        <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1"
                                                        stdDeviation="1.5"></feGaussianBlur>
                                        <feOffset in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
                                        <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1"
                                                     operator="arithmetic" result="shadowInnerInner1"></feComposite>
                                        <feColorMatrix in="shadowInnerInner1"
                                                       values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"></feColorMatrix>
                                    </filter>
                                </defs>
                                <g fill="none" fill-rule="nonzero" transform="matrix(1 0 0 -1 0 24)">
                                    <use fill="#000" filter="url(#scrap-icon-72-a)" href="#scrap-icon-72-b"></use>
                                    <use fill="#FFF" fill-opacity=".4" href="#scrap-icon-72-b"></use>
                                    <use fill="#000" filter="url(#scrap-icon-72-c)" href="#scrap-icon-72-b"></use>
                                    <path stroke="#FFF"
                                          d="M12.71 7.37h-.002a1.5 1.5 0 0 1-1.417 0L4.236 3.56a.499.499 0 0 0-.736.442v15.496c0 .553.448 1.002 1 1.002h15c.552 0 1-.449 1-1.002V4.002a.499.499 0 0 0-.734-.443l-7.057 3.81zm-.475-.88h-.001z"></path>
                                </g>
                            </svg>
                        </button></div>
                    <h1 className="project-feed__item__title">아기자기한 오브제로 가득한, 자취 1n년차의 아파트</h1>
                    <address className="project-feed__item__writer-wrap"><a className="project-feed__item__writer"
                                                                            href="/users/682396?affect_type=ProjectSelfIndex&amp;affect_id=1"><img
                        className="project-feed__item__writer__image" alt=""
                        src="https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/164999207696100900.jpeg?gif=1&amp;w=36&amp;h=36&amp;c=c&amp;webp=1"
                        srcSet="https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/164999207696100900.jpeg?gif=1&amp;w=72&amp;h=72&amp;c=c&amp;webp=1 1.5x,https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/164999207696100900.jpeg?gif=1&amp;w=72&amp;h=72&amp;c=c&amp;webp=1 2x,https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/164999207696100900.jpeg?gif=1&amp;w=144&amp;h=144&amp;c=c&amp;webp=1 3x"/><span
                        className="project-feed__item__writer__name">맥시멀구구</span></a></address>
                    <footer className="project-feed__item__status"><span className="entry">스크랩 47&nbsp;</span><span
                        className="entry">조회 795</span></footer>
                </article>
            </div>
            <div className="col-12 col-md-4">
                <article className="project-feed__item"><a className="project-feed__item__link"
                                                           href="/projects/129866/detail?affect_type=ProjectSelfIndex&amp;affect_id=2"></a>
                    <div className="project-feed__item__image"><img className="image" alt=""
                                                                    src="https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/166579298359262461.jpg?gif=1&amp;w=480&amp;h=320&amp;c=c&amp;q=80&amp;webp=1"
                                                                    srcSet="https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/166579298359262461.jpg?gif=1&amp;w=640&amp;h=427&amp;c=c&amp;q=80&amp;webp=1 1.5x,https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/166579298359262461.jpg?gif=1&amp;w=850&amp;h=567&amp;c=c&amp;q=80&amp;webp=1 2x,https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/166579298359262461.jpg?gif=1&amp;w=1280&amp;h=854&amp;c=c&amp;q=80&amp;webp=1 3x"/><span
                        className="project-feed__item__image__new" aria-label="NEW"><svg className="icon" width="36"
                                                                                         height="20"
                                                                                         viewBox="0 0 36 20"
                                                                                         preserveAspectRatio="xMidYMid meet"><g
                        fill="none" fill-rule="evenodd"><rect width="36" height="20" fill="#FDBD39" rx="4"></rect><path
                        fill="#FFF" fill-rule="nonzero"
                        d="M6 14V6h1.668l3.446 5.644h.036V6h1.318v8h-1.475L7.354 7.97h-.036V14H6zm8.414 0V6h5.174v1.131h-3.687v2.193h2.865v1.12h-2.865v2.425h3.76V14h-5.247zm8.317 0l-2.067-8h1.511l1.414 5.924h.037L25.318 6h1.21l1.667 5.924h.037L29.658 6H31l-2.03 8h-1.476l-1.62-5.808h-.036L24.194 14H22.73z"></path></g></svg></span>
                        <button className="project-feed__item__image__scrap" type="button" aria-label="스크랩">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 className="icon">
                                <defs>
                                    <path id="scrap-icon-73-b"
                                          d="M12.472 6.93l7.056-3.811A1 1 0 0 1 21 4.002v15.496c0 .83-.672 1.502-1.5 1.502h-15c-.828 0-1.5-.673-1.5-1.502V4.002a1 1 0 0 1 1.472-.883l7.056 3.811a.999.999 0 0 0 .944 0z"></path>
                                    <filter id="scrap-icon-73-a" width="150%" height="150%" x="-25%" y="-25%"
                                            filterUnits="objectBoundingBox">
                                        <feOffset in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                                        <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1"
                                                        stdDeviation="1.5"></feGaussianBlur>
                                        <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out"
                                                     result="shadowBlurOuter1"></feComposite>
                                        <feColorMatrix in="shadowBlurOuter1"
                                                       values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.26 0"></feColorMatrix>
                                    </filter>
                                    <filter id="scrap-icon-73-c" width="150%" height="150%" x="-25%" y="-25%"
                                            filterUnits="objectBoundingBox">
                                        <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1"
                                                        stdDeviation="1.5"></feGaussianBlur>
                                        <feOffset in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
                                        <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1"
                                                     operator="arithmetic" result="shadowInnerInner1"></feComposite>
                                        <feColorMatrix in="shadowInnerInner1"
                                                       values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"></feColorMatrix>
                                    </filter>
                                </defs>
                                <g fill="none" fill-rule="nonzero" transform="matrix(1 0 0 -1 0 24)">
                                    <use fill="#000" filter="url(#scrap-icon-73-a)" href="#scrap-icon-73-b"></use>
                                    <use fill="#FFF" fill-opacity=".4" href="#scrap-icon-73-b"></use>
                                    <use fill="#000" filter="url(#scrap-icon-73-c)" href="#scrap-icon-73-b"></use>
                                    <path stroke="#FFF"
                                          d="M12.71 7.37h-.002a1.5 1.5 0 0 1-1.417 0L4.236 3.56a.499.499 0 0 0-.736.442v15.496c0 .553.448 1.002 1 1.002h15c.552 0 1-.449 1-1.002V4.002a.499.499 0 0 0-.734-.443l-7.057 3.81zm-.475-.88h-.001z"></path>
                                </g>
                            </svg>
                        </button></div>
                    <h1 className="project-feed__item__title">행복은 이곳으로 모인다! 초보 농사꾼 가족의 주택살이 </h1>
                    <address className="project-feed__item__writer-wrap"><a className="project-feed__item__writer"
                                                                            href="/users/9087072?affect_type=ProjectSelfIndex&amp;affect_id=2"><img
                        className="project-feed__item__writer__image" alt=""
                        src="https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/166316789289396510.jpeg?gif=1&amp;w=36&amp;h=36&amp;c=c&amp;webp=1"
                        srcSet="https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/166316789289396510.jpeg?gif=1&amp;w=72&amp;h=72&amp;c=c&amp;webp=1 1.5x,https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/166316789289396510.jpeg?gif=1&amp;w=72&amp;h=72&amp;c=c&amp;webp=1 2x,https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/166316789289396510.jpeg?gif=1&amp;w=144&amp;h=144&amp;c=c&amp;webp=1 3x"/><span
                        className="project-feed__item__writer__name">오시롬</span></a></address>
                    <footer className="project-feed__item__status"><span className="entry">스크랩 7&nbsp;</span><span
                        className="entry">조회 558</span></footer>
                </article>
            </div>
        </div>
            <div className="virtualized-list row"
                 style={{paddingTop: '0px', paddingBottom: "0px", transform: "translateY(0px)"}}>
                <div className="col-12 col-md-4">
                    <article className="project-feed__item"><a className="project-feed__item__link"
                                                               href="/projects/130370/detail?affect_type=ProjectSelfIndex&amp;affect_id=0"></a>
                        <div className="project-feed__item__image"><img className="image" alt=""
                                                                        src="https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/166661001261289509.jpg?gif=1&amp;w=480&amp;h=320&amp;c=c&amp;q=80&amp;webp=1"
                                                                        srcSet="https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/166661001261289509.jpg?gif=1&amp;w=640&amp;h=427&amp;c=c&amp;q=80&amp;webp=1 1.5x,https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/166661001261289509.jpg?gif=1&amp;w=850&amp;h=567&amp;c=c&amp;q=80&amp;webp=1 2x,https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/166661001261289509.jpg?gif=1&amp;w=1280&amp;h=854&amp;c=c&amp;q=80&amp;webp=1 3x"/><span
                            className="project-feed__item__image__new" aria-label="NEW"><svg className="icon" width="36"
                                                                                             height="20"
                                                                                             viewBox="0 0 36 20"
                                                                                             preserveAspectRatio="xMidYMid meet"><g
                            fill="none" fill-rule="evenodd"><rect width="36" height="20" fill="#FDBD39" rx="4"></rect><path
                            fill="#FFF" fill-rule="nonzero"
                            d="M6 14V6h1.668l3.446 5.644h.036V6h1.318v8h-1.475L7.354 7.97h-.036V14H6zm8.414 0V6h5.174v1.131h-3.687v2.193h2.865v1.12h-2.865v2.425h3.76V14h-5.247zm8.317 0l-2.067-8h1.511l1.414 5.924h.037L25.318 6h1.21l1.667 5.924h.037L29.658 6H31l-2.03 8h-1.476l-1.62-5.808h-.036L24.194 14H22.73z"></path></g></svg></span>
                            <button className="project-feed__item__image__scrap" type="button" aria-label="스크랩">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     className="icon">
                                    <defs>
                                        <path id="scrap-icon-71-b"
                                              d="M12.472 6.93l7.056-3.811A1 1 0 0 1 21 4.002v15.496c0 .83-.672 1.502-1.5 1.502h-15c-.828 0-1.5-.673-1.5-1.502V4.002a1 1 0 0 1 1.472-.883l7.056 3.811a.999.999 0 0 0 .944 0z"></path>
                                        <filter id="scrap-icon-71-a" width="150%" height="150%" x="-25%" y="-25%"
                                                filterUnits="objectBoundingBox">
                                            <feOffset in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                                            <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1"
                                                            stdDeviation="1.5"></feGaussianBlur>
                                            <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out"
                                                         result="shadowBlurOuter1"></feComposite>
                                            <feColorMatrix in="shadowBlurOuter1"
                                                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.26 0"></feColorMatrix>
                                        </filter>
                                        <filter id="scrap-icon-71-c" width="150%" height="150%" x="-25%" y="-25%"
                                                filterUnits="objectBoundingBox">
                                            <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1"
                                                            stdDeviation="1.5"></feGaussianBlur>
                                            <feOffset in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
                                            <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1"
                                                         operator="arithmetic" result="shadowInnerInner1"></feComposite>
                                            <feColorMatrix in="shadowInnerInner1"
                                                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"></feColorMatrix>
                                        </filter>
                                    </defs>
                                    <g fill="none" fill-rule="nonzero" transform="matrix(1 0 0 -1 0 24)">
                                        <use fill="#000" filter="url(#scrap-icon-71-a)" href="#scrap-icon-71-b"></use>
                                        <use fill="#FFF" fill-opacity=".4" href="#scrap-icon-71-b"></use>
                                        <use fill="#000" filter="url(#scrap-icon-71-c)" href="#scrap-icon-71-b"></use>
                                        <path stroke="#FFF"
                                              d="M12.71 7.37h-.002a1.5 1.5 0 0 1-1.417 0L4.236 3.56a.499.499 0 0 0-.736.442v15.496c0 .553.448 1.002 1 1.002h15c.552 0 1-.449 1-1.002V4.002a.499.499 0 0 0-.734-.443l-7.057 3.81zm-.475-.88h-.001z"></path>
                                    </g>
                                </svg>
                            </button></div>
                        <h1 className="project-feed__item__title">리모델링 없이도 마음에 쏙! 차분한 톤의 24평 신혼집</h1>
                        <address className="project-feed__item__writer-wrap"><a className="project-feed__item__writer"
                                                                                href="/users/5940593?affect_type=ProjectSelfIndex&amp;affect_id=0"><img
                            className="project-feed__item__writer__image" alt=""
                            src="https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/166806673547605371.jpeg?gif=1&amp;w=36&amp;h=36&amp;c=c&amp;webp=1"
                            srcSet="https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/166806673547605371.jpeg?gif=1&amp;w=72&amp;h=72&amp;c=c&amp;webp=1 1.5x,https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/166806673547605371.jpeg?gif=1&amp;w=72&amp;h=72&amp;c=c&amp;webp=1 2x,https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/166806673547605371.jpeg?gif=1&amp;w=144&amp;h=144&amp;c=c&amp;webp=1 3x"/><span
                            className="project-feed__item__writer__name">nuoy-haus</span></a></address>
                        <footer className="project-feed__item__status"><span className="entry">스크랩 29&nbsp;</span><span
                            className="entry">조회 1,104</span></footer>
                    </article>
                </div>
                <div className="col-12 col-md-4">
                    <article className="project-feed__item"><a className="project-feed__item__link"
                                                               href="/projects/129704/detail?affect_type=ProjectSelfIndex&amp;affect_id=1"></a>
                        <div className="project-feed__item__image"><img className="image" alt=""
                                                                        src="https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/166539052596327079.jpg?gif=1&amp;w=480&amp;h=320&amp;c=c&amp;q=80&amp;webp=1"
                                                                        srcSet="https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/166539052596327079.jpg?gif=1&amp;w=640&amp;h=427&amp;c=c&amp;q=80&amp;webp=1 1.5x,https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/166539052596327079.jpg?gif=1&amp;w=850&amp;h=567&amp;c=c&amp;q=80&amp;webp=1 2x,https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/166539052596327079.jpg?gif=1&amp;w=1280&amp;h=854&amp;c=c&amp;q=80&amp;webp=1 3x"/><span
                            className="project-feed__item__image__new" aria-label="NEW"><svg className="icon" width="36"
                                                                                             height="20"
                                                                                             viewBox="0 0 36 20"
                                                                                             preserveAspectRatio="xMidYMid meet"><g
                            fill="none" fill-rule="evenodd"><rect width="36" height="20" fill="#FDBD39" rx="4"></rect><path
                            fill="#FFF" fill-rule="nonzero"
                            d="M6 14V6h1.668l3.446 5.644h.036V6h1.318v8h-1.475L7.354 7.97h-.036V14H6zm8.414 0V6h5.174v1.131h-3.687v2.193h2.865v1.12h-2.865v2.425h3.76V14h-5.247zm8.317 0l-2.067-8h1.511l1.414 5.924h.037L25.318 6h1.21l1.667 5.924h.037L29.658 6H31l-2.03 8h-1.476l-1.62-5.808h-.036L24.194 14H22.73z"></path></g></svg></span>
                            <button className="project-feed__item__image__scrap" type="button" aria-label="스크랩">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     className="icon">
                                    <defs>
                                        <path id="scrap-icon-72-b"
                                              d="M12.472 6.93l7.056-3.811A1 1 0 0 1 21 4.002v15.496c0 .83-.672 1.502-1.5 1.502h-15c-.828 0-1.5-.673-1.5-1.502V4.002a1 1 0 0 1 1.472-.883l7.056 3.811a.999.999 0 0 0 .944 0z"></path>
                                        <filter id="scrap-icon-72-a" width="150%" height="150%" x="-25%" y="-25%"
                                                filterUnits="objectBoundingBox">
                                            <feOffset in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                                            <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1"
                                                            stdDeviation="1.5"></feGaussianBlur>
                                            <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out"
                                                         result="shadowBlurOuter1"></feComposite>
                                            <feColorMatrix in="shadowBlurOuter1"
                                                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.26 0"></feColorMatrix>
                                        </filter>
                                        <filter id="scrap-icon-72-c" width="150%" height="150%" x="-25%" y="-25%"
                                                filterUnits="objectBoundingBox">
                                            <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1"
                                                            stdDeviation="1.5"></feGaussianBlur>
                                            <feOffset in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
                                            <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1"
                                                         operator="arithmetic" result="shadowInnerInner1"></feComposite>
                                            <feColorMatrix in="shadowInnerInner1"
                                                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"></feColorMatrix>
                                        </filter>
                                    </defs>
                                    <g fill="none" fill-rule="nonzero" transform="matrix(1 0 0 -1 0 24)">
                                        <use fill="#000" filter="url(#scrap-icon-72-a)" href="#scrap-icon-72-b"></use>
                                        <use fill="#FFF" fill-opacity=".4" href="#scrap-icon-72-b"></use>
                                        <use fill="#000" filter="url(#scrap-icon-72-c)" href="#scrap-icon-72-b"></use>
                                        <path stroke="#FFF"
                                              d="M12.71 7.37h-.002a1.5 1.5 0 0 1-1.417 0L4.236 3.56a.499.499 0 0 0-.736.442v15.496c0 .553.448 1.002 1 1.002h15c.552 0 1-.449 1-1.002V4.002a.499.499 0 0 0-.734-.443l-7.057 3.81zm-.475-.88h-.001z"></path>
                                    </g>
                                </svg>
                            </button></div>
                        <h1 className="project-feed__item__title">아기자기한 오브제로 가득한, 자취 1n년차의 아파트</h1>
                        <address className="project-feed__item__writer-wrap"><a className="project-feed__item__writer"
                                                                                href="/users/682396?affect_type=ProjectSelfIndex&amp;affect_id=1"><img
                            className="project-feed__item__writer__image" alt=""
                            src="https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/164999207696100900.jpeg?gif=1&amp;w=36&amp;h=36&amp;c=c&amp;webp=1"
                            srcSet="https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/164999207696100900.jpeg?gif=1&amp;w=72&amp;h=72&amp;c=c&amp;webp=1 1.5x,https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/164999207696100900.jpeg?gif=1&amp;w=72&amp;h=72&amp;c=c&amp;webp=1 2x,https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/164999207696100900.jpeg?gif=1&amp;w=144&amp;h=144&amp;c=c&amp;webp=1 3x"/><span
                            className="project-feed__item__writer__name">맥시멀구구</span></a></address>
                        <footer className="project-feed__item__status"><span className="entry">스크랩 47&nbsp;</span><span
                            className="entry">조회 795</span></footer>
                    </article>
                </div>
                <div className="col-12 col-md-4">
                    <article className="project-feed__item"><a className="project-feed__item__link"
                                                               href="/projects/129866/detail?affect_type=ProjectSelfIndex&amp;affect_id=2"></a>
                        <div className="project-feed__item__image"><img className="image" alt=""
                                                                        src="https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/166579298359262461.jpg?gif=1&amp;w=480&amp;h=320&amp;c=c&amp;q=80&amp;webp=1"
                                                                        srcSet="https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/166579298359262461.jpg?gif=1&amp;w=640&amp;h=427&amp;c=c&amp;q=80&amp;webp=1 1.5x,https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/166579298359262461.jpg?gif=1&amp;w=850&amp;h=567&amp;c=c&amp;q=80&amp;webp=1 2x,https://image.ohou.se/i/bucketplace-v2-development/uploads/cards/projects/166579298359262461.jpg?gif=1&amp;w=1280&amp;h=854&amp;c=c&amp;q=80&amp;webp=1 3x"/><span
                            className="project-feed__item__image__new" aria-label="NEW"><svg className="icon" width="36"
                                                                                             height="20"
                                                                                             viewBox="0 0 36 20"
                                                                                             preserveAspectRatio="xMidYMid meet"><g
                            fill="none" fill-rule="evenodd"><rect width="36" height="20" fill="#FDBD39" rx="4"></rect><path
                            fill="#FFF" fill-rule="nonzero"
                            d="M6 14V6h1.668l3.446 5.644h.036V6h1.318v8h-1.475L7.354 7.97h-.036V14H6zm8.414 0V6h5.174v1.131h-3.687v2.193h2.865v1.12h-2.865v2.425h3.76V14h-5.247zm8.317 0l-2.067-8h1.511l1.414 5.924h.037L25.318 6h1.21l1.667 5.924h.037L29.658 6H31l-2.03 8h-1.476l-1.62-5.808h-.036L24.194 14H22.73z"></path></g></svg></span>
                            <button className="project-feed__item__image__scrap" type="button" aria-label="스크랩">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                     className="icon">
                                    <defs>
                                        <path id="scrap-icon-73-b"
                                              d="M12.472 6.93l7.056-3.811A1 1 0 0 1 21 4.002v15.496c0 .83-.672 1.502-1.5 1.502h-15c-.828 0-1.5-.673-1.5-1.502V4.002a1 1 0 0 1 1.472-.883l7.056 3.811a.999.999 0 0 0 .944 0z"></path>
                                        <filter id="scrap-icon-73-a" width="150%" height="150%" x="-25%" y="-25%"
                                                filterUnits="objectBoundingBox">
                                            <feOffset in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                                            <feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1"
                                                            stdDeviation="1.5"></feGaussianBlur>
                                            <feComposite in="shadowBlurOuter1" in2="SourceAlpha" operator="out"
                                                         result="shadowBlurOuter1"></feComposite>
                                            <feColorMatrix in="shadowBlurOuter1"
                                                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.26 0"></feColorMatrix>
                                        </filter>
                                        <filter id="scrap-icon-73-c" width="150%" height="150%" x="-25%" y="-25%"
                                                filterUnits="objectBoundingBox">
                                            <feGaussianBlur in="SourceAlpha" result="shadowBlurInner1"
                                                            stdDeviation="1.5"></feGaussianBlur>
                                            <feOffset in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset>
                                            <feComposite in="shadowOffsetInner1" in2="SourceAlpha" k2="-1" k3="1"
                                                         operator="arithmetic" result="shadowInnerInner1"></feComposite>
                                            <feColorMatrix in="shadowInnerInner1"
                                                           values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"></feColorMatrix>
                                        </filter>
                                    </defs>
                                    <g fill="none" fill-rule="nonzero" transform="matrix(1 0 0 -1 0 24)">
                                        <use fill="#000" filter="url(#scrap-icon-73-a)" href="#scrap-icon-73-b"></use>
                                        <use fill="#FFF" fill-opacity=".4" href="#scrap-icon-73-b"></use>
                                        <use fill="#000" filter="url(#scrap-icon-73-c)" href="#scrap-icon-73-b"></use>
                                        <path stroke="#FFF"
                                              d="M12.71 7.37h-.002a1.5 1.5 0 0 1-1.417 0L4.236 3.56a.499.499 0 0 0-.736.442v15.496c0 .553.448 1.002 1 1.002h15c.552 0 1-.449 1-1.002V4.002a.499.499 0 0 0-.734-.443l-7.057 3.81zm-.475-.88h-.001z"></path>
                                    </g>
                                </svg>
                            </button></div>
                        <h1 className="project-feed__item__title">행복은 이곳으로 모인다! 초보 농사꾼 가족의 주택살이 </h1>
                        <address className="project-feed__item__writer-wrap"><a className="project-feed__item__writer"
                                                                                href="/users/9087072?affect_type=ProjectSelfIndex&amp;affect_id=2"><img
                            className="project-feed__item__writer__image" alt=""
                            src="https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/166316789289396510.jpeg?gif=1&amp;w=36&amp;h=36&amp;c=c&amp;webp=1"
                            srcSet="https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/166316789289396510.jpeg?gif=1&amp;w=72&amp;h=72&amp;c=c&amp;webp=1 1.5x,https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/166316789289396510.jpeg?gif=1&amp;w=72&amp;h=72&amp;c=c&amp;webp=1 2x,https://image.ohou.se/i/bucketplace-v2-development/uploads/users/profile_images/166316789289396510.jpeg?gif=1&amp;w=144&amp;h=144&amp;c=c&amp;webp=1 3x"/><span
                            className="project-feed__item__writer__name">오시롬</span></a></address>
                        <footer className="project-feed__item__status"><span className="entry">스크랩 7&nbsp;</span><span
                            className="entry">조회 558</span></footer>
                    </article>
                </div>
            </div>
    </div>
);
}

export default FeedList;