import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { PlusCircle, Lightbulb, Clock, Mail, User } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface GeneratedIdea {
  id: string;
  title: string;
  description: string;
  created_at: string;
  tech_stack: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ideas, setIdeas] = useState<GeneratedIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/sign-in');
        return;
      }
      setUserEmail(session.user.email || "");
    };

    const fetchIdeas = async () => {
      try {
        const { data, error } = await supabase
          .from('generated_ideas')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setIdeas(data || []);
      } catch (error) {
        console.error('Error fetching ideas:', error);
        toast({
          title: "Error loading ideas",
          description: "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
    fetchIdeas();
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
      <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 p-8">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 p-8">
      <div className="container max-w-6xl mx-auto space-y-8">
        {/* User Info Card */}
        <Card className="bg-white/50 backdrop-blur-sm border-none shadow-lg">
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary rounded-full">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Welcome back!</h2>
                <div className="flex items-center text-muted-foreground">
                  <Mail className="w-4 h-4 mr-2" />
                  {userEmail}
                </div>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/generator')} 
              className="bg-primary text-white hover:bg-primary/90"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Generate New Idea
            </Button>
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <h1 className="text-3xl font-bold">Your Generated Ideas</h1>
          
          {ideas.length === 0 ? (
            <Card className="text-center p-8 bg-white/50 backdrop-blur-sm border-none shadow-lg">
              <CardContent className="space-y-4">
                <Lightbulb className="w-12 h-12 mx-auto text-primary" />
                <h2 className="text-xl font-semibold">No Ideas Generated Yet</h2>
                <p className="text-muted-foreground">
                  Start by generating your first website idea!
                </p>
                <Button 
                  onClick={() => navigate('/generator')}
                  className="bg-primary text-white hover:bg-primary/90"
                >
                  Generate Your First Idea
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {ideas.map((idea) => (
                <Card key={idea.id} className="hover:shadow-lg transition-shadow bg-white/50 backdrop-blur-sm border-none">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-start">
                      <span className="text-xl">{idea.title}</span>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        {formatDate(idea.created_at)}
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{idea.description}</p>
                    {idea.tech_stack && (
                      <div className="text-sm">
                        <span className="font-semibold">Tech Stack:</span> {idea.tech_stack}
                      </div>
                    )}
                    <Button 
                      variant="outline" 
                      onClick={() => navigate('/generated-idea', { state: { generatedIdea: idea } })}
                      className="hover:bg-primary hover:text-white"
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;