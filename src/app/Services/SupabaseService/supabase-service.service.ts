import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { supabaseKey, supabaseUrl } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseServiceService {

  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      supabaseUrl,
      supabaseKey
    );
  }

  getImageUrl(bucketName: string, imagePath: string): string {
    const { data } = this.supabase
      .storage
      .from(bucketName)
      .getPublicUrl(imagePath);
    
    return data.publicUrl;
  }
}
