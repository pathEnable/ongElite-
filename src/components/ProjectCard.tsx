import Image from "next/image"
import Link from "next/link"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ProjectCardProps {
    title: string
    description: string
    imageUrl: string
    slug: string
}

export function ProjectCard({ title, description, imageUrl, slug }: ProjectCardProps) {
    return (
        <Card className="flex flex-col overflow-hidden">
            <div className="relative h-48 w-full">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                />
            </div>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
                <CardDescription className="text-base">
                    {description}
                </CardDescription>
            </CardContent>
            <CardFooter>
                <Button asChild className="w-full">
                    <Link href={`/projects/${slug}`}>En savoir plus</Link>
                </Button>
            </CardFooter>
        </Card>
    )
}
