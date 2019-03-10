import React from 'react'
import styled from '@emotion/styled'

const BurgerButtonWrapper = styled.div`
  margin: 20px;
`

const burgerIcon = `<svg width="35" height="23" xmlns="http://www.w3.org/2000/svg"><g fill="#FFF" fill-rule="evenodd"><rect width="31" height="5" rx="2.5"/><rect x="2" y="9" width="31" height="5" rx="2.5"/><rect x="4" y="18" width="31" height="5" rx="2.5"/></g></svg>`

const BurgerButton = styled.button`
  appearance: none;
  background: none;
  padding: 0;
  border: none;
`

export default (props) => {
  return (
    <BurgerButtonWrapper>
      <BurgerButton {...props}>
        <span dangerouslySetInnerHTML={{ __html: burgerIcon }} />
      </BurgerButton>
    </BurgerButtonWrapper>
  )
}
