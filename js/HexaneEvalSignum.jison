/* description: Parses and executes LaTex expressions generated by SigNumQuill. 
   Created for use with Hexane: hexane.tk */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */

"#"?[0-9]+"."?([0-9#]+)?   return 'NUMBER'
("#"?"."?[0-9#]+)	      return 'NUMBER'
("\\frac{")           return 'FRAC'
("\\cdot")            return '*'
("\\left(")           return '('
("\\right)")          return ')'
("\\left[")           return '['
("\\right]")          return ']'
("\\left\\{")         return '{'
("\\right\\}")        return '}'
("\\left|")           return '|l'
("\\right|")          return '|r'
("\\log_{")           return 'LOG'
("\\log_")            return 'LOGS'
("\\sqrt{")           return 'SQRT'
("\\sqrt[")           return 'NTHROOT'
("\\oplus")           return 'XOR'
("\\times")           return '*'
("\\otimes")          return '*'
("\\divide")          return '/'
("\\div")             return '/'
"pi"                  return 'PI'
"\\pi"                return 'PI'
"\\theta"             return 'THETA'
"e"                   return 'E'
("true")			  return 'T'
("false")			  return 'F'
("\\operatorname{true}")		   return 'T'
("\\operatorname{false}")		   return 'F'
("E")                 return 'EXP'
("mod")				  return 'MOD'
("\\operatorname{mod}")		       return 'MOD'
("not")                            return 'NOT'
("\\operatorname{not}")            return 'NOT'
("and")                            return 'AND'
("\\operatorname{and}")            return 'AND'
("or")                             return 'OR'
("\\operatorname{or}")             return 'OR'
("xor")                            return 'XOR'
("\\operatorname{xor}")            return 'XOR'
("bitand")                         return 'BAND'
("\\operatorname{bitand}")         return 'BAND'
("bitor")                          return 'BOR'
("\\operatorname{bitor}")          return 'BOR'
("bitxor")                         return 'BXOR'
("\\operatorname{bitxor}")         return 'BXOR'
("bitnot")                         return 'BNOT'
("\\operatorname{bitnot}")         return 'BNOT'

("\\le")              return '<='
("\\ge")              return '>='

"\\"?[a-zA-Z"$"]+([0-9a-zA-Z"$"]+)?"_{"([0-9a-zA-Z"_$"]+"}")   return 'NAME'
"\\"?[a-zA-Z"_$"]+([0-9a-zA-Z"_$"]+)?                          return 'NAME'
"*"                   return '*'
"/"                   return '/'
"-"                   return '-'
"+"                   return '+'
"^"                   return '^'
("\\%")               return '%'

">>"                  return '>>'
"<<"                  return '<<'

":="                  return ':='
"=="                  return '='
"!="                  return '!='
"="                   return '='
"<"                   return '<'
">"                   return '>'

"!"                   return '!'
"{"            		  return '{'
"}"            		  return '}'
"%"                   return '%'
"["                   return '['
"]"                   return ']'
"("                   return '('
")"                   return ')'
","                   return ','

<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */

%right ':='
%left OR XOR
%left AND
%left '<' '>' '=' '>=' '<=' '!='
%left '+' '-'
%left '*' '/' MOD
%left LOG LOGS
%left '^'
%right '!' '%'
%left BOR BXOR
%left BAND
%left '<<' '>>'
%left 'NOT'
%left BNOT
%left UMINUS
%left EXP

%start expressions

%% /* language grammar */

expressions
    : e EOF
        { if (typeof console == 'undefined') print($1);
          return $1; }
    ;
	
expression_list
    : expression_list ',' e
      { $$ = $1.concat([$3]); }
    | e
      { $$ = [$1]; }
    ;

e
    : e '+' e
        {$$ = $1.plus($3);}
    | e '-' e
        {$$ = $1.minus($3);}
    | e '*' e
        {$$ = $1.times($3);}
    | e '/' e
        {$$ = $1.div($3);}
	| '|' e '|'
        {$$ = SigNum.abs($2);}
	| e MOD e
        {$$ = $1.mod($3);}
	| e OR e
        {$$ = $1 || $3;}
	| e AND e
        {$$ = $1 && $3;}
	| e XOR e
        {$$ = ($1 || $3) && !($1 && $3) ;}
	| NOT e
        {$$ = !$2;}
	| e BOR e
        {$$ = $1.or($3);}
	| e BAND e
        {$$ = $1.and($3);}
	| e BXOR e
        {$$ = $1.xor($3);}
	| BNOT e
        {$$ = $2.not();}
	| e '>>' e
		{$$ = $1.shr($3);}
	| e '<<' e
		{$$ = $1.shl($3);}
	| e EXP e
        {$$ = $1.times(SigNum.pow(10, $3));}
    | e '^' e
        {$$ = $1.expo($3);}
	| e '=' e
		{$$ = ($1.value != undefined ? $1.value == $3.value : $1 == $3);}
	| e '!=' e
		{$$ = ($1.value != undefined ? $1.value != $3.value : $1 != $3);}
	| e '<' e
		{$$ = $1 < $3;}
	| e '>' e
		{$$ = $1 > $3;}
	| e '<=' e
		{$$ = $1 <= $3;}
	| e '>=' e
		{$$ = $1 >= $3;}
    | e '!'
        {{
          $$ = (function fact (n) { return n==0 ? 1 : fact(n.minus(1)).times(n) })($1);
        }}
    | e '%'
        {$$ = $1.times(0.01);}
    | '-' e %prec UMINUS
        {$$ = $2.times(-1);}
	| '(' e ')'
        {$$ = $2;}
	| '[' e ']'
        {$$ = $2;}
	| '{' e '}'
        {$$ = $2;}
	| '|l' e '|r'
        {$$ = SigNum.abs($2);}
	| FRAC e '}' '{' e '}'
		{$$  = $2.div($5);}
	| SQRT e '}'
		{$$ = SigNum.sqrt($2);}
	| NTHROOT e ']' '{' e '}' 
		{$$ = SigNum.root($5, $2);}
	| LOGS e
		{var tmp = SigNum.floor($2.div(SigNum.pow(10,SigNum.floor(SigNum.log10($2)))));
		 var val = $2.minus(tmp.times(SigNum.pow(10,SigNum.floor(SigNum.log10($2)))));
		 $$ = SigNum.log(val, tmp); }
	| LOGS NUMBER '(' e ')'
		{$$ = SigNum.log($4, $2) }
	| LOGS NUMBER '[' e ']'
		{$$ = SigNum.log($4, $2) }
	| LOGS NUMBER '{' e '}'
		{$$ = SigNum.log($4, $2) }
	| LOG e '}' NUMBER
		{$$ = SigNum.log($4, $2) }
	| LOG e '}' '(' e ')'
		{$$ = SigNum.log($5, $2) }
	| LOG e '}' '[' e ']'
		{$$ = SigNum.log($5, $2) }
	| LOG e '}' '{' e '}'
		{$$ = SigNum.log($5, $2) }
    | NUMBER
        {$$ = new SigNum(yytext);}
		
	| NAME '(' expression_list ')'
		{if ($1[0] == '\\') $1 = $1.substring(1);
		 $$ = Hexane.funcs[$NAME].apply(undefined, $expression_list);}
	| NUMBER NAME '(' expression_list ')'
		{if ($2[0] == '\\') $2 = $2.substring(1);
		 $$ = $1 * Hexane.funcs[$NAME].apply(undefined, $expression_list);}
	| NAME '(' ')'
		{if ($1[0] == '\\') $1 = $1.substring(1);
		 $$ = Hexane.funcs[$NAME].apply(undefined, []);}
	| NUMBER NAME '(' ')'
		{if ($2[0] == '\\') $2 = $2.substring(1);
		 $$ = $1 * Hexane.funcs[$NAME].apply(undefined, []);}
	| NAME ':=' e
		{Hexane.vars[$1] = $3; $$ = Hexane.vars[$1]; }
	| NAME
        {$$ = Hexane.vars[$1];}
	| NUMBER NAME
        {$$ = $1.times(Hexane.vars[$2]);}
	| NUMBER NUMBER
		{$$ = $1.times($2);}
	| NAME '{' e '}'
		{$$ = Hexane.vars[$1.concat($3)];}
    | E
        {$$ = SigNum.E;}
    | PI
        {$$ = SigNum.PI;}
	| THETA
        {$$ = Hexane.vars['theta'];}
	| NUMBER PI
        {$$ = $1.times(SigNum.PI);}
	| NUMBER E
        {$$ = $1.times(SigNum.E);}
	| NUMBER THETA
        {$$ = $1.times(Hexane.vars['theta']);}
	| T
        {$$ = true;}
    | F
        {$$ = false;}
    ;
