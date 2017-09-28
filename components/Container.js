import styled from 'styled-components';
import media from '../utils/media';

export default styled.div`
  width: 920px;
  margin: 0 auto;
  ${media.handheld`
    width: 100%;
  `};
`;
