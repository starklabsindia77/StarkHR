import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'

const positionSchema = z.object({
  title: z.string().min(1, 'Position title is required'),
  department: z.string().min(1, 'Department is required'),
  gradeLevel: z.string().min(1, 'Grade level is required'),
  reportingTo: z.string().optional(),
  minSalary: z.string().optional(),
  maxSalary: z.string().optional(),
  description: z.string().optional(),
})

interface AddPositionFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: z.infer<typeof positionSchema>) => void
}

export function AddPositionForm({ open, onOpenChange, onSubmit }: AddPositionFormProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof positionSchema>>({
    resolver: zodResolver(positionSchema),
    defaultValues: {
      title: '',
      department: '',
      gradeLevel: '',
      reportingTo: '',
      minSalary: '',
      maxSalary: '',
      description: '',
    },
  })

  const handleSubmit = async (data: z.infer<typeof positionSchema>) => {
    try {
      setIsSubmitting(true)
      await onSubmit(data)
      form.reset()
      onOpenChange(false)
      toast({
        title: 'Success',
        description: 'Position has been added successfully.',
      })
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add position. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Position</DialogTitle>
          <DialogDescription>
            Enter the position details below. All fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Position Title *</Label>
              <Input
                id="title"
                {...form.register('title')}
                placeholder="Software Engineer"
              />
              {form.formState.errors.title && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Select
                onValueChange={(value) => form.setValue('department', value)}
                defaultValue={form.getValues('department')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                  <SelectItem value="hr">Human Resources</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.department && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.department.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gradeLevel">Grade Level *</Label>
              <Select
                onValueChange={(value) => form.setValue('gradeLevel', value)}
                defaultValue={form.getValues('gradeLevel')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select grade level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="l1">Level 1</SelectItem>
                  <SelectItem value="l2">Level 2</SelectItem>
                  <SelectItem value="l3">Level 3</SelectItem>
                  <SelectItem value="l4">Level 4</SelectItem>
                  <SelectItem value="l5">Level 5</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.gradeLevel && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.gradeLevel.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="reportingTo">Reports To</Label>
              <Select
                onValueChange={(value) => form.setValue('reportingTo', value)}
                defaultValue={form.getValues('reportingTo')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select reporting manager" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="john-doe">John Doe</SelectItem>
                  <SelectItem value="jane-smith">Jane Smith</SelectItem>
                  <SelectItem value="mike-johnson">Mike Johnson</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="minSalary">Minimum Salary</Label>
              <Input
                id="minSalary"
                type="number"
                {...form.register('minSalary')}
                placeholder="Enter minimum salary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxSalary">Maximum Salary</Label>
              <Input
                id="maxSalary"
                type="number"
                {...form.register('maxSalary')}
                placeholder="Enter maximum salary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              {...form.register('description')}
              placeholder="Enter position description"
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add Position'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}