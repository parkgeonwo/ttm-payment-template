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
    <div className="min-h-screen bg-[#08090a] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[#f7f8f8] mb-3 tracking-[-0.022em]">
            Component Library
          </h1>
          <p className="text-[15px] text-[#8a8f98]">
            Linear Design System 기반의 재사용 가능한 UI 컴포넌트 모음
          </p>
        </div>

        <div className="space-y-12">
          {/* Buttons Section */}
          <section>
            <h2 className="text-2xl font-semibold text-[#f7f8f8] mb-6 tracking-[-0.022em]">
              Buttons
            </h2>
            <Card>
              <CardContent>
                <div className="space-y-8">
                  {/* Variants */}
                  <div>
                    <h3 className="text-[13px] font-medium text-[#d0d6e0] mb-4">
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
                    <h3 className="text-[13px] font-medium text-[#d0d6e0] mb-4">
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
                    <h3 className="text-[13px] font-medium text-[#d0d6e0] mb-4">
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
                    <h3 className="text-[13px] font-medium text-[#d0d6e0] mb-4">
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
                    <h3 className="text-[13px] font-medium text-[#d0d6e0] mb-4">
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
            <h2 className="text-2xl font-semibold text-[#f7f8f8] mb-6 tracking-[-0.022em]">
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
            <h2 className="text-2xl font-semibold text-[#f7f8f8] mb-6 tracking-[-0.022em]">
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
                  <p className="text-[13px] text-[#8a8f98]">
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
                  <p className="text-[13px] text-[#8a8f98]">
                    This card has a hover effect with border highlight and transform.
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
                  <p className="text-[13px] text-[#8a8f98]">Main content here.</p>
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
            <h2 className="text-2xl font-semibold text-[#f7f8f8] mb-6 tracking-[-0.022em]">
              Badges
            </h2>
            <Card>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-[13px] font-medium text-[#d0d6e0] mb-4">
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
                    <h3 className="text-[13px] font-medium text-[#d0d6e0] mb-4">
                      Sizes
                    </h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge size="sm">Small</Badge>
                      <Badge size="md">Medium</Badge>
                      <Badge size="lg">Large</Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[13px] font-medium text-[#d0d6e0] mb-4">
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
            <h2 className="text-2xl font-semibold text-[#f7f8f8] mb-6 tracking-[-0.022em]">
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
            <h2 className="text-2xl font-semibold text-[#f7f8f8] mb-6 tracking-[-0.022em]">
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
            <h2 className="text-2xl font-semibold text-[#f7f8f8] mb-6 tracking-[-0.022em]">
              Color Palette
            </h2>
            <Card>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-[13px] font-medium text-[#d0d6e0] mb-3">
                      Brand Colors
                    </h3>
                    <div className="grid grid-cols-5 gap-2">
                      <div className="space-y-1">
                        <div className="h-16 rounded bg-[#5e6ad2] border border-[#23252a]" />
                        <p className="text-[11px] text-center text-[#8a8f98]">Brand</p>
                      </div>
                      <div className="space-y-1">
                        <div className="h-16 rounded bg-[#7170ff] border border-[#23252a]" />
                        <p className="text-[11px] text-center text-[#8a8f98]">Accent</p>
                      </div>
                      <div className="space-y-1">
                        <div className="h-16 rounded bg-[#828fff]" />
                        <p className="text-[11px] text-center text-[#8a8f98]">Link</p>
                      </div>
                      <div className="space-y-1">
                        <div className="h-16 rounded bg-[#08090a] border border-[#23252a]" />
                        <p className="text-[11px] text-center text-[#8a8f98]">Background</p>
                      </div>
                      <div className="space-y-1">
                        <div className="h-16 rounded bg-[#141516] border border-[#23252a]" />
                        <p className="text-[11px] text-center text-[#8a8f98]">Surface</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[13px] font-medium text-[#d0d6e0] mb-3">
                      Semantic Colors
                    </h3>
                    <div className="grid grid-cols-4 gap-2">
                      <div className="space-y-1">
                        <div className="h-16 rounded bg-[#4cb782]" />
                        <p className="text-[11px] text-center text-[#8a8f98]">Success</p>
                      </div>
                      <div className="space-y-1">
                        <div className="h-16 rounded bg-[#f2c94c]" />
                        <p className="text-[11px] text-center text-[#8a8f98]">Warning</p>
                      </div>
                      <div className="space-y-1">
                        <div className="h-16 rounded bg-[#eb5757]" />
                        <p className="text-[11px] text-center text-[#8a8f98]">Error</p>
                      </div>
                      <div className="space-y-1">
                        <div className="h-16 rounded bg-[#4ea7fc]" />
                        <p className="text-[11px] text-center text-[#8a8f98]">Info</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Typography Section */}
          <section>
            <h2 className="text-2xl font-semibold text-[#f7f8f8] mb-6 tracking-[-0.022em]">
              Typography
            </h2>
            <Card>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-6xl font-bold text-[#f7f8f8] tracking-[-0.022em]">
                      Heading 1
                    </p>
                    <p className="text-[13px] text-[#8a8f98] mt-1">
                      text-6xl / font-bold / tracking-[-0.022em]
                    </p>
                  </div>
                  <div>
                    <p className="text-4xl font-semibold text-[#f7f8f8] tracking-[-0.022em]">
                      Heading 2
                    </p>
                    <p className="text-[13px] text-[#8a8f98] mt-1">
                      text-4xl / font-semibold
                    </p>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-[#f7f8f8] tracking-[-0.022em]">
                      Heading 3
                    </p>
                    <p className="text-[13px] text-[#8a8f98] mt-1">
                      text-2xl / font-semibold
                    </p>
                  </div>
                  <div>
                    <p className="text-[15px] text-[#f7f8f8]">
                      Body text - Regular weight
                    </p>
                    <p className="text-[13px] text-[#8a8f98] mt-1">
                      text-[15px] / font-normal
                    </p>
                  </div>
                  <div>
                    <p className="text-[13px] text-[#d0d6e0]">
                      Secondary text - Lighter color
                    </p>
                    <p className="text-[13px] text-[#8a8f98] mt-1">
                      text-[13px] / secondary
                    </p>
                  </div>
                  <div>
                    <p className="text-[13px] text-[#8a8f98]">
                      Tertiary text - Smallest and lightest
                    </p>
                    <p className="text-[13px] text-[#8a8f98] mt-1">
                      text-[13px] / tertiary
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
