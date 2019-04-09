import React, { useState } from 'react'

export default function NewPlayerForm(props) {
  const { onSubmit } = props
  const [text, setText] = useState('')
  const updateText = e => setText(e.target.value)

  return (
    <input
      onChange={updateText}
      value={text}
      placeholder="Ссылка на профиль в Steam"
    />
  )
}
