import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { mixins } from '@styles';

const StyledContainer = styled.footer`
  ${mixins.flexCenter};
  flex-direction: column;
  padding: 15px;
  text-align: center;
  height: auto;
  min-height: 70px;
`;
const Footer = () => {

  return (
    <StyledContainer>
      © 2025
    </StyledContainer>
  );
};

Footer.propTypes = {
  githubInfo: PropTypes.object,
};

export default Footer;
