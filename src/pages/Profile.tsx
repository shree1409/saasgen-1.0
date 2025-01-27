import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Database } from "@/integrations/supabase/types";
import { Mail, User as UserIcon, Clock, Lightbulb, ArrowRight } from "lucide-react";
import Header from "@/components/landing/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type GeneratedIdea = Database['public']['Tables']['generated_ideas']['Row'];

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [generatedIdeas, setGeneratedIdeas] = useState<GeneratedIdea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndIdeas = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/sign-in');
          return;
        }
        setUser(user);

        const { data: ideas, error } = await supabase
          .from('generated_ideas')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setGeneratedIdeas(ideas || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error loading profile",
          description: "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndIdeas();
  }, [navigate, toast]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
        <Header />
        <div className="container px-4 py-12">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      <Header />
      <div className="container px-4 py-12">
        <div className="space-y-8">
          {/* User Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="w-6 h-6 text-primary" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <span>Member since {formatDate(user?.created_at || '')}</span>
              </div>
            </CardContent>
          </Card>

          {/* Generated Ideas Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-6 h-6 text-yellow-500" />
                Your Generated Ideas
              </CardTitle>
              <Button onClick={() => navigate('/generator')} variant="outline">
                Generate New Idea
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardHeader>
            <CardContent>
              {generatedIdeas.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">You haven't generated any ideas yet.</p>
                  <Button onClick={() => navigate('/generator')}>Generate Your First Idea</Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Tech Stack</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {generatedIdeas.map((idea) => (
                        <TableRow key={idea.id}>
                          <TableCell className="font-medium">{idea.title}</TableCell>
                          <TableCell className="max-w-md truncate">
                            {idea.description}
                          </TableCell>
                          <TableCell>{idea.tech_stack}</TableCell>
                          <TableCell>{formatDate(idea.created_at)}</TableCell>
                          <TableCell>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigate('/generated-idea', { state: { generatedIdea: idea } })}
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;