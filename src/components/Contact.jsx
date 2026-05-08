import React, { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    const newErrors = {}
    const name = formData.name.trim()
    const email = formData.email.trim()
    const message = formData.message.trim()

    if (!name) {
      newErrors.name = '名前を入力してください。'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      newErrors.email = '有効なメールアドレスを入力してください'
    }

    if (!message) {
      newErrors.message = 'メッセージを入力してください'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      alert('お問い合わせありがとうございます！\n（実際の送信機能は実装されていません）')
      setFormData({ name: '', email: '', message: '' })
      setErrors({})
    }
  }

  return (
    <section id="contact">
      <h2>Contact</h2>
      <p className="section-lead">GitHubの制作物や学習内容についてのご連絡はこちらからお願いします。</p>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">お名前</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="email">メールアドレス</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="message">問い合わせ内容</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          {errors.message && <div className="error">{errors.message}</div>}
        </div>
        <button type="submit" className="submit-button">送信</button>
      </form>
    </section>
  )
}
