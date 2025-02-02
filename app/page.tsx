"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { getVisitCount, shortenUrl } from "@/apis/url"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Link, QrCode } from "lucide-react"
import { GhostMascot } from "@/components/shared/GhostMascot"

const Page = () => {
  const [originalUrl, setOriginalUrl] = useState<string>("")
  const [shortUrl, setShortUrl] = useState<string | null>(null)
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [visitCount, setVisitCount] = useState<number | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const data = await shortenUrl(originalUrl)
      const fullShortUrl = `${data.shortUrl}`
      setShortUrl(fullShortUrl)
      setQrCode(data.qrCode)
      setVisitCount(0)
    } catch (err) {
      console.error(err)
      setError("Failed to shorten URL. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const fetchVisitCount = async () => {
    if (shortUrl) {
      try {
        const data = await getVisitCount(shortUrl)
        setVisitCount(data.visitCount)
      } catch (err) {
        console.error(err)
        setError("Failed to get visit count. Please try again.")
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 flex justify-center items-center p-4">
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-none text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            <GhostMascot />
            GhostLink
          </CardTitle>
          <CardDescription className="text-purple-200">Shorten your links, haunt the web!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type="url"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className="w-full pl-10 bg-white/20 border-purple-400 text-white placeholder-purple-300"
                placeholder="Enter your spooky long URL"
                required
              />
              <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" size={18} />
            </div>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Summon Short Link"}
            </Button>
          </form>

          {error && <div className="text-red-400 mt-2">{error}</div>}

          {shortUrl && (
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Your Ghostly Link:</h3>
                <a
                  href={`${process.env.NEXT_PUBLIC_API_URL}${shortUrl}`}
                  className="text-purple-300 hover:text-purple-100 break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {process.env.NEXT_PUBLIC_API_URL}
                  {shortUrl}
                </a>
              </div>
              {qrCode && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Spectral QR Code:</h3>
                  <div className="bg-white p-2 inline-block rounded">
                    <Image src={qrCode || "/placeholder.svg"} alt="QR Code" width={150} height={150} />
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
        {shortUrl && (
          <CardFooter className="flex justify-between items-center">
            <Button
              onClick={fetchVisitCount}
              variant="outline"
              className="text-purple-200 border-purple-400 bg-transparent hover:text-white hover:bg-purple-700"
            >
              <QrCode className="mr-2 h-4 w-4" />
              Reveal Visit Count
            </Button>
            {visitCount !== null && <span className="text-purple-200">Haunted {visitCount} times</span>}
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

export default Page

