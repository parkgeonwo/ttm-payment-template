'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Select from '@/components/ui/Select'
import Textarea from '@/components/ui/Textarea'

export default function ComponentsPage() {
  const [inputValue, setInputValue] = useState('')
  const [textareaValue, setTextareaValue] = useState('')
  const [selectValue, setSelectValue] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLoadingDemo = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  const selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4 (Disabled)', disabled: true },
  ]

  return (
    <div className="min-h-screen bg-[#fafafa] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#18181b] mb-3">
            Component Library
          </h1>
          <p className="text-lg text-[#71717a]">
            Linear Design System 기반의 재사용 가능한 UI 컴포넌트 모음
          </p>
        </div>

        <div className="space-y-12">
          {/* Buttons Section */}
          <section>
            <h2 className="text-2xl font-semibold text-[#18181b] mb-6">
              Buttons
            </h2>
            <Card>
              <CardContent>
                <div className="space-y-8">
                  {/* Variants */}
                  <div>
                    <h3 className="text-sm font-medium text-[#71717a] mb-4">
                      Variants
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="primary">Primary</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="danger">Danger</Button>
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <h3 className="text-sm font-medium text-[#71717a] mb-4">
                      Sizes
                    </h3>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button size="sm">Small</Button>
                      <Button size="md">Medium</Button>
                      <Button size="lg">Large</Button>
                    </div>
                  </div>

                  {/* States */}
                  <div>
                    <h3 className="text-sm font-medium text-[#71717a] mb-4">
                      States
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <Button>Normal</Button>
                      <Button disabled>Disabled</Button>
                      <Button loading={loading} onClick={handleLoadingDemo}>
                        {loading ? 'Loading...' : 'Click to Load'}
                      </Button>
                    </div>
                  </div>

                  {/* With Icons */}
                  <div>
                    <h3 className="text-sm font-medium text-[#71717a] mb-4">
                      With Icons
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <Button
                        leftIcon={
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M8 3V13M3 8H13"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        }
                      >
                        Add Item
                      </Button>
                      <Button
                        variant="secondary"
                        rightIcon={
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M6 12L10 8L6 4"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        }
                      >
                        Next
                      </Button>
                    </div>
                  </div>

                  {/* Full Width */}
                  <div>
                    <h3 className="text-sm font-medium text-[#71717a] mb-4">
                      Full Width
                    </h3>
                    <Button fullWidth>Full Width Button</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Inputs Section */}
          <section>
            <h2 className="text-2xl font-semibold text-[#18181b] mb-6">
              Inputs
            </h2>
            <Card>
              <CardContent>
                <div className="space-y-6">
                  <Input
                    label="Basic Input"
                    placeholder="Enter text..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    fullWidth
                  />

                  <Input
                    label="With Helper Text"
                    placeholder="Your email"
                    helperText="We'll never share your email."
                    type="email"
                    fullWidth
                  />

                  <Input
                    label="With Error"
                    placeholder="Enter value"
                    error="This field is required"
                    fullWidth
                  />

                  <Input
                    label="Disabled"
                    placeholder="Disabled input"
                    disabled
                    fullWidth
                  />

                  <Input
                    label="With Left Icon"
                    placeholder="Search..."
                    leftIcon={
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <circle
                          cx="7"
                          cy="7"
                          r="5"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M11 11L14 14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    }
                    fullWidth
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Cards Section */}
          <section>
            <h2 className="text-2xl font-semibold text-[#18181b] mb-6">
              Cards
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Default Card</CardTitle>
                  <CardDescription>
                    A simple card with header and content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#71717a]">
                    This is the card content area where you can place any
                    content.
                  </p>
                </CardContent>
              </Card>

              <Card hoverable>
                <CardHeader>
                  <CardTitle>Hoverable Card</CardTitle>
                  <CardDescription>
                    Hover over this card to see the effect
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#71717a]">
                    This card has a hover effect with shadow and transform.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Card with Footer</CardTitle>
                  <CardDescription>
                    This card includes a footer section
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-[#71717a]">Main content here.</p>
                </CardContent>
                <CardFooter>
                  <Button size="sm" fullWidth>
                    Action
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </section>

          {/* Badges Section */}
          <section>
            <h2 className="text-2xl font-semibold text-[#18181b] mb-6">
              Badges
            </h2>
            <Card>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-[#71717a] mb-4">
                      Variants
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge>Default</Badge>
                      <Badge variant="primary">Primary</Badge>
                      <Badge variant="success">Success</Badge>
                      <Badge variant="warning">Warning</Badge>
                      <Badge variant="error">Error</Badge>
                      <Badge variant="info">Info</Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-[#71717a] mb-4">
                      Sizes
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge size="sm">Small</Badge>
                      <Badge size="md">Medium</Badge>
                      <Badge size="lg">Large</Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-[#71717a] mb-4">
                      With Dot
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <Badge dot variant="success">
                        Active
                      </Badge>
                      <Badge dot variant="warning">
                        Pending
                      </Badge>
                      <Badge dot variant="error">
                        Error
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Select Section */}
          <section>
            <h2 className="text-2xl font-semibold text-[#18181b] mb-6">
              Select
            </h2>
            <Card>
              <CardContent>
                <div className="space-y-6">
                  <Select
                    label="Basic Select"
                    placeholder="Choose an option"
                    options={selectOptions}
                    value={selectValue}
                    onChange={(e) => setSelectValue(e.target.value)}
                    fullWidth
                  />

                  <Select
                    label="With Helper Text"
                    helperText="Please select an option from the list"
                    options={selectOptions}
                    fullWidth
                  />

                  <Select
                    label="With Error"
                    error="Please select a valid option"
                    options={selectOptions}
                    fullWidth
                  />

                  <Select
                    label="Disabled"
                    options={selectOptions}
                    disabled
                    fullWidth
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Textarea Section */}
          <section>
            <h2 className="text-2xl font-semibold text-[#18181b] mb-6">
              Textarea
            </h2>
            <Card>
              <CardContent>
                <div className="space-y-6">
                  <Textarea
                    label="Basic Textarea"
                    placeholder="Enter your message..."
                    value={textareaValue}
                    onChange={(e) => setTextareaValue(e.target.value)}
                    fullWidth
                  />

                  <Textarea
                    label="With Helper Text"
                    placeholder="Your feedback"
                    helperText="Maximum 500 characters"
                    fullWidth
                  />

                  <Textarea
                    label="With Error"
                    placeholder="Enter text"
                    error="This field cannot be empty"
                    fullWidth
                  />

                  <Textarea
                    label="No Resize"
                    placeholder="Fixed size"
                    resize="none"
                    rows={3}
                    fullWidth
                  />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Color Palette Section */}
          <section>
            <h2 className="text-2xl font-semibold text-[#18181b] mb-6">
              Color Palette
            </h2>
            <Card>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-[#71717a] mb-3">
                      Primary Colors
                    </h3>
                    <div className="grid grid-cols-5 gap-2">
                      <div className="space-y-1">
                        <div className="h-16 rounded bg-[#f0f3ff] border border-[#e5e5e5]" />
                        <p className="text-xs text-center text-[#71717a]">50</p>
                      </div>
                      <div className="space-y-1">
                        <div className="h-16 rounded bg-[#e0e7ff] border border-[#e5e5e5]" />
                        <p className="text-xs text-center text-[#71717a]">
                          100
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="h-16 rounded bg-[#c7d2fe]" />
                        <p className="text-xs text-center text-[#71717a]">
                          200
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="h-16 rounded bg-[#5b21b6]" />
                        <p className="text-xs text-center text-[#71717a]">
                          500
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="h-16 rounded bg-[#312e81]" />
                        <p className="text-xs text-center text-[#71717a]">
                          900
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-[#71717a] mb-3">
                      Status Colors
                    </h3>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="space-y-1">
                        <div className="h-16 rounded bg-[#22c55e]" />
                        <p className="text-xs text-center text-[#71717a]">
                          Success
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="h-16 rounded bg-[#f59e0b]" />
                        <p className="text-xs text-center text-[#71717a]">
                          Warning
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="h-16 rounded bg-[#ef4444]" />
                        <p className="text-xs text-center text-[#71717a]">
                          Error
                        </p>
                      </div>
                      <div className="space-y-1">
                        <div className="h-16 rounded bg-[#3b82f6]" />
                        <p className="text-xs text-center text-[#71717a]">
                          Info
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Typography Section */}
          <section>
            <h2 className="text-2xl font-semibold text-[#18181b] mb-6">
              Typography
            </h2>
            <Card>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-6xl font-bold text-[#18181b]">
                      Heading 1
                    </p>
                    <p className="text-sm text-[#71717a] mt-1">
                      text-6xl / font-bold
                    </p>
                  </div>
                  <div>
                    <p className="text-5xl font-bold text-[#18181b]">
                      Heading 2
                    </p>
                    <p className="text-sm text-[#71717a] mt-1">
                      text-5xl / font-bold
                    </p>
                  </div>
                  <div>
                    <p className="text-4xl font-semibold text-[#18181b]">
                      Heading 3
                    </p>
                    <p className="text-sm text-[#71717a] mt-1">
                      text-4xl / font-semibold
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-[#18181b]">
                      Heading 4
                    </p>
                    <p className="text-sm text-[#71717a] mt-1">
                      text-2xl / font-semibold
                    </p>
                  </div>
                  <div>
                    <p className="text-base text-[#18181b]">
                      Body text - Regular weight
                    </p>
                    <p className="text-sm text-[#71717a] mt-1">
                      text-base / font-normal
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-[#71717a]">
                      Secondary text - Smaller and lighter
                    </p>
                    <p className="text-sm text-[#71717a] mt-1">
                      text-sm / text-secondary
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}
