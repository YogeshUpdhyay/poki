import styled from "styled-components";

const SkewedTapeContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 80px;
    z-index: 2;
`;

const SkewedTapeBgContainer = styled.div`
    width: 100%;
    height: 140px;
    transform: skewY(${(props) => props.angle});
    background-color: var(--color-black);
    border-bottom: 2px solid var(--color-${(props) => props.borderColor});
    border-top: 2px solid var(--color-${(props) => props.borderColor});
    position: absolute;
    z-index: 3;
    display: block;
    overflow: hidden;
`;

const SkewedTapeContentContainer = styled.div`
    width: 100%;
    height: 100%;
    transform: rotate(${(props) => props.angle})
        skewY(${(props) => props.angle * -1});
    transform-origin: ${(props) => props.tranformOrigin || "50% 50% 0"};
    background-color: ${(props) =>
        props.theme[props.backgroundColor] || props.theme.black};

    position: absolute;
    display: block;
    z-index: 4;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.white};
`;

const SkewedTape = (props) => {
    return (
        <SkewedTapeBgContainer
            angle={props.angle}
            borderColor={props.borderColor}
        >
            <SkewedTapeContentContainer
                transformOrigin={props.transformOrigin}
                borderColor={props.borderColor}
            >
                {props.children}
            </SkewedTapeContentContainer>
        </SkewedTapeBgContainer>
    );
};

export default SkewedTape;