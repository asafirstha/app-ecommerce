/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { css } from "@emotion/react";

const AnmTransisi = css`
  transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
`;

const TombolReuse = css`
  cursor: pointer;
  :hover {
    box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.3);
  }
`;

const Tombol = css`
  ${AnmTransisi};
  border: none;
  color: black;
  padding: 0 12px 4px 12px;
  text-align: center;
  border-radius: 50%;
  text-decoration: none;
  display: inline-block;
  font-size: 25px;
  cursor: pointer;
  user-select: none;
  position: relative;
  top: 0;
  left: 0;
`;

const PlusBiru = styled.div`
  ${Tombol};
  ${TombolReuse};
  background-color: #c6cfff;
`;

const PlusGray = styled.div`
  ${Tombol};
  background-color: hsl(233.7, 15.5%, 75%);
  color: hsla(0, 0%, 100%, 0.5);
`;

const MinusMerah = styled.div`
  ${Tombol};
  ${TombolReuse};
  background-color: #ffc6c6;
  padding: 0 15px 4px 15px;
`;

export { PlusBiru, PlusGray, MinusMerah };
