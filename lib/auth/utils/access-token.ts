export function extractUuidFromToken(token: string): string {
  try {
    const [header, payload, signature] = token.split('.')
    const decodedPayload = JSON.parse(atob(payload))
    
    if (!decodedPayload.sub) {
      throw new Error('No user UUID in token payload')
    }
    return decodedPayload.sub
  } catch (error) {
    console.error('Token parsing error:', error)
    throw new Error('Invalid token format')
  }
} 