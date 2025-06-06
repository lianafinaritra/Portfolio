import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme, mixins } from '@styles';

const { colors, fontSizes, fonts } = theme;

const StyledContainer = styled.div`
  ${mixins.flexCenter};
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99;
`;

const StyledDots = styled.div`
  color: ${colors.darkPurple};
  font-size: ${fontSizes.xxl};
  font-family: ${fonts.SFMono};
  animation: pulse 1.5s infinite ease-in-out;

  @keyframes pulse {
    0%, 100% {
      opacity: 0.2;
    }
    50% {
      opacity: 1;
    }
  }
`;

const Loader = ({ finishLoading }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      finishLoading();
    }, 1000);

    return () => clearTimeout(timeout);
  }, [finishLoading]);

  return (
    <StyledContainer className="loader">
      <Helmet bodyAttributes={{ class: `hidden` }} />
      <StyledDots>...</StyledDots>
    </StyledContainer>
  );
};

Loader.propTypes = {
  finishLoading: PropTypes.func.isRequired,
};

export default Loader;
