import React from "react";
import Helmet from "react-helmet";
import styled from "@emotion/styled";
import { graphql } from "gatsby";

import Post from "../components/Post";
import About from "../components/About";
import Work from "../components/Work";
import Tags from "../components/Tags";

import { fadeInBottom } from "../css/animations";

import "prismjs/themes/prism-tomorrow.css";

const Container = styled.div`
  max-width: 100%;
  transform: translateY(16px) scale(0.99);
  transform-origin: 50% 0;
  opacity: 0;
  animation: ${fadeInBottom} 0.3s cubic-bezier(0.39, 0.575, 0.565, 1) both;
`;

export default function BlogPost({ data = {}, location, pageContext }) {
  const { markdownRemark: post } = data;
  const { next, prev } = pageContext;

  const isAbout = /^\/about\/?$/.test(location.pathname);
  const isWork = /^\/work\/?$/.test(location.pathname);

  const description = post.frontmatter.excerpt ? post.frontmatter.excerpt : post.excerpt;
  const image = post.frontmatter.image ? post.frontmatter.image.childImageSharp.resize.src : null;
  const author = data.site.siteMetadata.author;

  const meta = [
    { name: `description`, content: description },
    { name: `og:description`, content: description },
    { name: `twitter:description`, content: description },
    { name: `og:title`, content: post.frontmatter.title },
    { name: `og:type`, content: `article` },
    { name: `article:author`, content: author },
    { name: `twitter:creator`, content: author },
    { name: `author`, content: author },
    { name: `twitter:label1`, content: `Reading time` },
    { name: `twitter:data1`, content: `${post.timeToRead} min read` },
    { name: `article:published_time`, content: post.frontmatter.rawDate }
  ].concat(image ? [{ name: `og:image`, content: image }, { name: `twitter:image`, content: image }] : []);

  if (isAbout) {
    return (
      <Container>
        <Helmet title={`Shaderism — ${post.frontmatter.title}`} meta={meta} />
        <About
          className="blog-post"
          html={post.html}
          date={post.frontmatter.date}
          linkTo={post.frontmatter.link || "/"}
          title={post.frontmatter.title}
          next={next}
          prev={prev}
        />
      </Container>
    );
  }

  if (isWork) {
    return (
      <Container>
        <Helmet title={`Shaderism — ${post.frontmatter.title}`} meta={meta} />
        <Work
          className="blog-post"
          html={post.html}
          date={post.frontmatter.date}
          linkTo={post.frontmatter.link || "/"}
          title={post.frontmatter.title}
          next={next}
          prev={prev}
        />
      </Container>
    );
  }

  return (
    <Container>
      <Helmet title={`Shaderism — ${post.frontmatter.title}`} meta={meta} />
      <Post
        className="blog-post"
        html={post.html}
        date={post.frontmatter.date}
        linkTo={post.frontmatter.link || "/"}
        title={post.frontmatter.title}
        next={next}
        prev={prev}
      >
        <Tags list={post.frontmatter.tags} />
      </Post>
    </Container>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      id
      html
      excerpt(pruneLength: 160)
      timeToRead
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        rawDate: date
        excerpt
        path
        link
        tags
        title
        image {
          childImageSharp {
            resize(width: 1500, height: 1500) {
              src
            }
          }
        }
      }
    }
  }
`;
