import { createClient } from "@supabase/supabase-js"

const PROJECT_URL = "https://cfqjmxomcizhngurwiue.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNmcWpteG9tY2l6aG5ndXJ3aXVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk0ODYzNjcsImV4cCI6MTk4NTA2MjM2N30.1k19ZSiFLIY6tjcqP5BoANlOO86JeirptK-mMZYolDM"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                .select("*")
                
        }
    }
}