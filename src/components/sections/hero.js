import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { github } from '@config';
import styled from 'styled-components';
import { theme, mixins, media, Section } from '@styles';
const { colors, navDelay, loaderDelay } = theme;

const StyledContainer = styled(Section)`
  ${mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 110vh;
  ${media.tablet`padding-top: 0;`};
  div {
    width: 100%;
  }
`;
const StyledTitle = styled.h2`
  font-size: 60px;
  line-height: 1.1;
  margin: 0;
  color: ${colors.purple};
  ${media.desktop`font-size: 70px;`};
  ${media.tablet`font-size: 60px;`};
  ${media.phablet`font-size: 50px;`};
  ${media.phone`font-size: 40px;`};
`;
const StyledSubtitle = styled.h3`
  font-size: 60px;
  line-height: 1.1;
  color: ${colors.darkPurple};
  ${media.desktop`font-size: 70px;`};
  ${media.tablet`font-size: 60px;`};
  ${media.phablet`font-size: 50px;`};
  ${media.phone`font-size: 40px;`};
`;
const StyledDescription = styled.div`
  width: 50%;
  max-width: 600px;
  color: ${colors.grey};
  a {
    ${mixins.inlineLink};
  }
`;
const StyledEmailLink = styled.a`
  ${mixins.bigButton};
  margin-top: 20px;
`;
const StyledSplitLayout = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 50px;
  ${media.tablet`
    flex-direction: column;
  `}
`;
const StyledLeft = styled.div`
  flex: 1;
  margin-top: 120px;
  margin-bottom: 10px;
`;
const StyledRight = styled.div`
  flex: 1;
  padding: 20px;
  border-radius: 8px;
`;
const StyledPic = styled.div`
  position: relative;
  width: 40%;
  max-width: 300px;
  margin-left: 60px;
  ${media.tablet`margin: 60px auto 0;`};
  ${media.phablet`width: 70%;`};
  a {
    &:focus {
      outline: 0;
    }
  }
`;
const StyledAvatar = styled.img`
  position: relative;
  mix-blend-mode: multiply;
  border-radius: ${theme.borderRadius};
  transition: ${theme.transition};
`;
const StyledAvatarLink = styled.a`
  ${mixins.boxShadow};
  width: 100%;
  position: relative;
  border-radius: ${theme.borderRadius};
  background-color: ${colors.lightestSlate};
  &:hover,
  &:focus {
    background: transparent;
    &:after {
      top: 15px;
      left: 15px;
    }
    ${StyledAvatar} {
      filter: none;
      mix-blend-mode: normal;
    }
  }
  &:before,
  &:after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: ${theme.borderRadius};
    transition: ${theme.transition};
  }
  &:before {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${colors.navy};
    mix-blend-mode: screen;
  }
  &:after {
    top: 10px;
    left: 10px;
    z-index: -1;
  }
`;

const Hero = ({ data }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);

  const { frontmatter, html } = data[0].node;

  const one = () => (
    <StyledTitle style={{ transitionDelay: '200ms' }}>{frontmatter.name}</StyledTitle>
  );
  const two = () => (
    <StyledSubtitle style={{ transitionDelay: '300ms' }}>{frontmatter.subtitle}</StyledSubtitle>
  );
  const three = () => (
    <StyledDescription
      style={{ transitionDelay: '400ms' }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/CV.pdf';
    link.download = 'Liana_Finaritra_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const four = () => (
    <div style={{ transitionDelay: '500ms' }}>
      <StyledEmailLink onClick={handleDownload}>Télécharger le CV</StyledEmailLink>
    </div>
  );

  const items = [one, two, three, four];

  return (
    <StyledContainer>
      <StyledSplitLayout>
        <StyledLeft>
          <TransitionGroup component={null}>
            {isMounted &&
              items.map((item, i) => (
                <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                  {item}
                </CSSTransition>
              ))}
          </TransitionGroup>
        </StyledLeft>

        {isMounted && (
          <StyledRight style={{ opacity: isMounted ? 1 : 0, transition: 'opacity 500ms ease-in-out' }}>
            <StyledPic>
              <StyledAvatarLink href={github}>
                <StyledAvatar src="/images/me.png" alt="Avatar" />
              </StyledAvatarLink>
            </StyledPic>
          </StyledRight>
        )}
      </StyledSplitLayout>
    </StyledContainer>

  );
};

Hero.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Hero;
