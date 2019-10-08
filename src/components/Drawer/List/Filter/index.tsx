const FilterContent = styled(
  posed.div({
    open: {
      height: 'auto',
    },
    closed: {
      height: 0,
    },
  })
)`
  padding-top: ${props =>
    props.pose === 'open' ? `${Sizes.SPACING / 2}px` : 0};
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
