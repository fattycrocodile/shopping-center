import React, { ReactElement } from "react";
import Head from "./components/Head";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ButtonPrimary from "./components/ButtonPrimary";

import {
  Mjml,
  MjmlBody,
  MjmlSection,
  MjmlColumn,
  MjmlText,
  MjmlSpacer,
} from "mjml-react";

type TextEmailProps = {
  name: string;
  headline?: string;
  body: ReactElement;
  bulletedList?: ReactElement;
  ctaText?: string;
};

const TextEmail: React.FC<TextEmailProps> = ({
  name,
  headline,
  body,
  bulletedList,
  ctaText,
}) => {
  return (
    <Mjml>
      <Head />
      <MjmlBody width={600}>
        <Header />
        <MjmlSection padding="0 24px 0" cssClass="smooth">
          <MjmlColumn>
            {headline && (
              <MjmlText padding="24px 0 8px" fontSize={24} lineHeight="120%">
                {headline}
              </MjmlText>
            )}
            <MjmlText padding="16px 0 16px" fontSize={16} lineHeight="160%">
              Hello {name},
            </MjmlText>
            <MjmlText
              cssClass="paragraph"
              padding="0"
              fontSize={16}
              lineHeight="160%"
            >
              {body}
            </MjmlText>
            {bulletedList && (
              <>
                <MjmlSpacer height="16px" />
                {bulletedList}
              </>
            )}
            {ctaText && (
              <>
                <MjmlSpacer height="24px" />
                <ButtonPrimary link={"#"} uiText={ctaText} />
                <MjmlSpacer height="8px" />
              </>
            )}
            <MjmlText padding="16px 0" fontSize={16} lineHeight="160%">
              ♥,
              <br />
              Mailing
            </MjmlText>
          </MjmlColumn>
        </MjmlSection>
        <Footer />
      </MjmlBody>
    </Mjml>
  );
};

export default TextEmail;
