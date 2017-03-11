/* description: Parses and executes LaTex expressions generated by MathQuill. 
   Created for use with Hexane: hexane.tk */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
"#"

[0-9]+"."?([0-9]+)?   return 'NUMBER'
("."?[0-9]+)	      return 'NUMBER'
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
"!="                  return '!='
"=="                  return '='
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
        {$$ = $1+$3;}
    | e '-' e
        {$$ = $1-$3;}
    | e '*' e
        {$$ = $1*$3;}
    | e '/' e
        {$$ = $1/$3;}
	| '|' e '|'
		{$$ = Math.abs($2);}
	| e MOD e
        {$$ = $1 % $3;}
	| e OR e
        {$$ = $1 || $3;}
	| e AND e
        {$$ = $1 && $3;}
	| e XOR e
        {$$ = ($1 || $3) && !($1 && $3) ;}
	| NOT e
        {$$ = !$2;}
	| e BOR e
        {$$ = $1 | $3;}
	| e BAND e
        {$$ = $1 & $3;}
	| e BXOR e
        {$$ = $1 ^ $3;}
	| BNOT e
        {$$ = ~$2;}
	| e '>>' e
		{$$ = $1 >> $3;}
	| e '<<' e
		{$$ = $1 << $3;}
	| e EXP e
        {$$ = $1 * Math.pow(10, $3);}
    | e '^' e
        {$$ = Math.pow($1, $3);}
	| e '=' e
		{$$ = $1 == $3;}
	| e '!=' e
		{$$ = $1 != $3;}
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
          $$ = (function fact (n) { return n==0 ? 1 : fact(n-1) * n })($1);
        }}
    | e '%'
        {$$ = $1/100;}
    | '-' e %prec UMINUS
        {$$ = -$2;}
	| '(' e ')'
        {$$ = $2;}
	| '[' e ']'
        {$$ = $2;}
	| '{' e '}'
        {$$ = $2;}
	| '|l' e '|r'
        {$$ = Math.abs($2);}
	| FRAC e '}' '{' e '}'
		{$$  = $2 / $5;}
	| SQRT e '}'
		{$$ = Math.sqrt($2);}
	| NTHROOT e ']' '{' e '}' 
		{$$ = Math.pow($5, 1/$2);}
	| LOGS e
		{var tmp = Math.floor($2/Math.pow(10,Math.floor(Math.log10($2))));
		 $$ = Math.log2($2-tmp*Math.pow(10,Math.floor(Math.log10($2)))) / Math.log2(tmp); }
	| LOGS NUMBER '(' e ')'
		{$$ = Math.log2($4) / Math.log2($2) }
	| LOGS NUMBER '[' e ']'
		{$$ = Math.log2($4) / Math.log2($2) }
	| LOGS NUMBER '{' e '}'
		{$$ = Math.log2($4) / Math.log2($2) }
	| LOG e '}' NUMBER
		{$$ = Math.log2($4) / Math.log2($2) }
	| LOG e '}' '(' e ')'
		{$$ = Math.log2($5) / Math.log2($2) }
	| LOG e '}' '[' e ']'
		{$$ = Math.log2($5) / Math.log2($2) }
	| LOG e '}' '{' e '}'
		{$$ = Math.log2($5) / Math.log2($2) }
    | NUMBER
        {$$ = Number(yytext);}
		
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
        {$$ = $1 * Hexane.vars[$2];}
	| NUMBER NUMBER
		{$$ = $1 * $2;}
	| NAME '{' e '}'
		{$$ = Hexane.vars[$1.concat($3)];}
    | E
        {$$ = Math.E;}
    | PI
        {$$ = Math.PI;}
	| THETA
        {$$ = Hexane.vars['theta'];}
	| NUMBER PI
        {$$ = $1 * Math.PI;}
	| NUMBER E
        {$$ = $1 * Math.E;}
	| NUMBER THETA
        {$$ = $1 * Hexane.vars['theta'];}
	| T
        {$$ = true;}
    | F
        {$$ = false;}
    ;
