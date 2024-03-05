import React from 'react'

interface ZodInputFieldProps {
  name: string
  type: string
  register: any
  error: string | undefined
  required?: boolean
  placeholder?: string
}

const ZodInputField: React.FC<ZodInputFieldProps> = ({
  name,
  type,
  register,
  error,
  required = true,
  placeholder = '',
}) => (
  <div className="mt-5">
    <input
      {...register(name, { required })}
      type={type}
      className="w-full rounded-md border border-black bg-transparent px-4 py-2 text-black placeholder-black dark:border-white dark:text-white dark:placeholder-white"
      placeholder={placeholder}
    />
    {error && <p className="mt-1 text-red-600">{error}</p>}
  </div>
)

export default ZodInputField
